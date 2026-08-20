# Payment Flow

This document describes the current food-cart and Razorpay payment flow.

## Architecture

```text
Food card selected
  -> Redux order/cart state
  -> localStorage persistence
  -> Orders page
  -> Selected card payment button
  -> Backend verifies food ID and reads current database price
  -> Backend creates Razorpay order
  -> Razorpay Checkout opens
  -> Backend verifies Razorpay signature
  -> MongoDB order becomes paid/confirmed
  -> Only the paid food is removed from Redux/localStorage
```

## Important Security Rule

`localStorage` is only used for cart persistence. It is not trusted.

The frontend must never decide the final payment amount. A user can edit localStorage, so the backend receives only:

```json
{
  "items": [
    {
      "foodId": "food_mongodb_id",
      "quantity": 1
    }
  ]
}
```

The backend finds the food in MongoDB, checks availability, reads the current `price`, calculates the total, and sends that amount to Razorpay.

## Backend Environment

Keep both Razorpay keys in `Backend/.env`:

```env
TEST_API_KEY=rzp_test_your_public_key
TEST_KEY_SECRET=your_secret_key
```

- `TEST_API_KEY` is the public test key used by the backend Razorpay SDK and returned to the frontend for Checkout.
- `TEST_KEY_SECRET` is private and must stay on the backend.
- Never add `TEST_KEY_SECRET` to `Frontend/.env` or expose it in browser code.
- Restart the backend after changing `.env`:

```powershell
cd Backend
npm run dev
```

Frontend may contain only a public API/base URL. The current payment code receives `keyId` from the backend response.

## API Routes

All payment routes require the authentication cookie through `authMiddleware`.

### Create Razorpay Order

```text
POST /api/orders/payment-order
```

Request body:

```json
{
  "items": [
    {
      "foodId": "food_mongodb_id",
      "quantity": 2
    }
  ]
}
```

Backend steps:

1. Validate food IDs and quantities.
2. Find available foods in MongoDB.
3. Read the real database price.
4. Calculate each subtotal and the total amount.
5. Create a Razorpay order in paise (`rupees * 100`).
6. Save a pending order in MongoDB.
7. Return the Razorpay order information to the frontend.

The response contains values such as:

```json
{
  "keyId": "rzp_test_...",
  "razorpayOrderId": "order_...",
  "orderId": "mongodb_order_id",
  "amount": 39800,
  "currency": "INR"
}
```

### Verify Payment

```text
POST /api/orders/verify-payment
```

Request body:

```json
{
  "orderId": "mongodb_order_id",
  "razorpayOrderId": "order_...",
  "razorpayPaymentId": "pay_...",
  "razorpaySignature": "signature_from_razorpay"
}
```

The backend creates this signature:

```text
HMAC_SHA256(razorpayOrderId + "|" + razorpayPaymentId, TEST_KEY_SECRET)
```

Only when the generated signature matches the Razorpay signature does the backend update the order to:

```json
{
  "paymentStatus": "paid",
  "orderStatus": "confirmed"
}
```

## Frontend Payment Flow

The payment page is [Frontend/src/pages/Payment.jsx](Frontend/src/pages/Payment.jsx).

It:

1. Receives the selected food through React Router state.
2. Sends only the food ID and quantity to the backend.
3. Dynamically loads Razorpay Checkout from:

```text
https://checkout.razorpay.com/v1/checkout.js
```

4. Opens Razorpay using the server-created order and amount.
5. Sends Razorpay callback values to `/api/orders/verify-payment`.
6. Removes only the successfully paid food using `removeOrderById(foodId)`.
7. Keeps all unpaid cart items.

## Redux Cart State

The current cart state is in [Frontend/src/redux/orderSlice.js](Frontend/src/redux/orderSlice.js).

The state is persisted under:

```text
localStorage.orders
```

Important actions:

```js
addOrder(food)
removeOrderById(foodId)
clearOrders()
```

Payment success uses:

```js
dispatch(removeOrderById(foodId));
```

It must not use `clearOrders()` because that would remove every unpaid item too.

## MongoDB Order Model

The model is [Backend/src/models/order.model.js](Backend/src/models/order.model.js).

It stores:

- `user`
- `items.food`
- `items.quantity`
- `items.priceAtPurchase`
- `totalAmount`
- `razorpayOrderId`
- `razorpayPaymentId`
- `razorpaySignature`
- `paymentStatus`
- `orderStatus`

`priceAtPurchase` preserves the price that was used when the payment order was created.

## Testing

Use Razorpay test keys and test payment details from the Razorpay Dashboard.

Test checklist:

- Login before opening payment.
- Add at least one food to the cart.
- Open `/orders`.
- Click payment on one food card.
- Confirm the backend receives the food ID.
- Confirm the backend calculates the amount from MongoDB.
- Complete Razorpay test payment.
- Confirm signature verification succeeds.
- Confirm only the paid food disappears from `/orders`.
- Confirm unpaid foods remain.
- Confirm the order is saved with `paid` and `confirmed` status.

## Common Errors

### `key_id or oauthToken is mandatory`

`TEST_API_KEY` is missing from `Backend/.env`, or the backend was not restarted after adding it.

### `401 Unauthorized`

The login cookie is missing or expired. Login again and ensure Axios uses:

```js
withCredentials: true
```

### PhonePe does not redirect

The app selection and redirect behavior are controlled by Razorpay, the device, browser, and installed UPI apps. Google Pay working does not guarantee PhonePe intent redirect in every browser or test environment.

### Payment succeeds but cart is not removed

Check `/api/orders/verify-payment` first. The cart is removed only after backend signature verification succeeds.

## Production Notes

- Never commit `.env` files.
- Rotate any secret key that has been exposed.
- Use production Razorpay keys only in production.
- Store confirmed orders in MongoDB; localStorage should remain only a temporary cart.
- For stronger reliability, add a Razorpay webhook to reconcile payment status if the browser closes after payment.
