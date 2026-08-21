🍽️ Dish & Co. — Food Ordering Web Application

Dish & Co. is a modern, responsive food-ordering web application built with the MERN Stack.
The project focuses on a smooth food browsing, location-based ordering, authentication, cart/order management, and admin food-management experience.

🚀 Features
👤 User Authentication
User Registration
User Login
JWT-based authentication
HTTP-only cookies for authentication
Protected user routes
Logout functionality
Current user management with Redux Toolkit
Role-based authentication
📍 Location & Delivery
Browser geolocation support
Automatic latitude & longitude detection
Reverse geocoding using OpenStreetMap/Nominatim
Stores:
Latitude
Longitude
City
Full Address
Location stored in MongoDB
Location synchronized with Redux
Delivery location required before proceeding to payment
🍕 Food Menu
Dynamic food menu fetched from backend
Food categories
Category-based filtering
Food search
Price filtering
Availability filtering
Sorting
Pagination
Responsive Swiper food sections
Lazy-loaded food images
ImageKit CDN for food images
🛒 Cart / Orders
Add food to cart
Quantity-based pricing
Remove/clear orders
Order summary
Delivery location validation
Proceed-to-payment flow
Redux Toolkit for cart/order state management
💳 Payment Flow
Order details passed to payment page
Delivery location validation
Payment preparation flow
Secure backend communication
👨‍💼 Admin Panel

Admin users have access to food-management functionality.

Admin Food Upload
Admin-only food upload page
Upload food image
Food name
Description
Price
Category
Availability status
Image upload through ImageKit
Backend validation
Admin authorization middleware
🧑‍💻 User Profile
Display current user information
Username
Email
Mobile number
User ID
Delivery address
Logout functionality
Animated UI elements
🛠️ Tech Stack
Frontend
React.js
React Router DOM
Redux Toolkit
Axios
Tailwind CSS
Motion / Motion React
Swiper.js
React Hook Form
Lucide React
React Hot Toast
SweetAlert2
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
Cookie Parser
CORS
Multer
ImageKit
External Services
ImageKit — Food image storage/CDN
OpenStreetMap Nominatim — Reverse geocoding
🎨 Website Design System
Primary Colors
Color	Hex	Usage
Ink Blue	#03071E	Primary dark/background
Dark Maroon	#370617	Dark accent
Medium Maroon	#61040F	Accent
Light Maroon	#9D0208	Accent
Tomato Red	#D00000	Highlight
Tomato Orange	#DC2F02	Accent
Orange	#E85D04	Primary CTA
Light Orange	#F48C05	Secondary CTA
Turmeric	#FAA307	Highlight
Froooti	#FFBA08	Highlight
Text Colors
#03071E/80 → Medium Gray
#FDFBF7    → Warm Cream
#F5F2EB    → Almond
✍️ Typography
Cinzel

Used for:

Logo
Hero headings
Section titles
Important headings
Poppins

Used for:

Navbar
Buttons
Food cards
Dish names
Navigation elements
DM Sans

Used for:

Body text
Inputs
Prices
Footer content
📂 Project Structure
Dish-Co/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddLocation.jsx
│   │   │   ├── FoodCard.jsx
│   │   │   ├── FloatingLeaf.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SwiperFoodList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AdminUploadFood.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── userSlice.js
│   │   │   └── orderSlice.js
│   │   │
│   │   ├── hooks/
│   │   │   └── useCurrentUser.js
│   │   │
│   │   ├── utils/
│   │   │   └── AxiosInstence.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── food.controller.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── food.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── food.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── services/
│   │   └── storage.service.js
│   │
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
🗄️ Database Structure
User
{
  userName: String,
  email: String,
  mobileNumber: String,
  password: String,
  location: {
    latitude: Number,
    longitude: Number,
    city: String,
    fullAddress: String
  },
  role: {
    type: String,
    enum: ["customer", "restorant", "admin"]
  }
}
Food
{
  foodName: String,
  description: String,
  price: Number,
  foodImage: String,
  category: String,
  isAvailable: Boolean
}
🔐 Authentication Flow
User
 │
 ├── Register
 │      ↓
 │   Password Hash
 │      ↓
 │   MongoDB
 │
 └── Login
        ↓
      JWT
        ↓
   HTTP-Only Cookie
        ↓
   Auth Middleware
        ↓
   Protected Routes

JWT contains:

{
    id: user._id,
    role: user.role
}
👨‍💼 Admin Authorization

Admin routes use authentication + role verification.

Request
   ↓
authMiddleware
   ↓
JWT Verification
   ↓
adminMiddleware
   ↓
role === "admin"
   ↓
Admin Resource

Only authorized administrators can access the Upload Food functionality.

🍔 Food API
Get Food Items
GET /api/food/items

Supports:

category
search
isAvailable
minPrice
maxPrice
sort
page
limit

Example:

GET /api/food/items?category=Chicken&page=1&limit=10
Get Single Food
GET /api/food/items/:id
Admin Upload Food
POST /api/food/items

Requires:

Authentication
+
Admin Authorization
📍 Location API
Update User Location
PATCH /api/auth/location

Request body:

{
  "latitude": 28.6139,
  "longitude": 77.2090,
  "city": "Delhi",
  "fullAddress": "Delhi, India"
}
🖼️ Image Architecture

Food images are not stored directly inside MongoDB.

Instead:

Admin Upload
      ↓
Multer
      ↓
Image Buffer
      ↓
ImageKit
      ↓
CDN Image URL
      ↓
MongoDB

MongoDB stores only the image URL:

foodImage: "https://ik.imagekit.io/..."

This keeps the database lightweight and allows images to be delivered efficiently through ImageKit's CDN.

📱 Responsive Design

The application follows a mobile-first responsive design approach.

Supported layouts include:

Mobile
   ↓
Tablet
   ↓
Desktop

Food sections use responsive Swiper breakpoints:

breakpoints={{
    640: {
        slidesPerView: 3
    },
    768: {
        slidesPerView: 4
    },
    1024: {
        slidesPerView: 5
    }
}}
✨ Animations

The UI uses Motion React for interactive animations.

Examples:

Navbar entrance animation
Button hover/tap animations
Page transitions
Floating leaf animation
Food UI interactions
Spring-based micro-interactions

The floating leaf component generates stable animation parameters once using React state rather than calling Math.random() directly during render.

⚡ Performance Considerations

The project uses several optimization techniques:

Lazy loading food images
Pagination for food API
ImageKit CDN
MongoDB filtering
Server-side sorting
Server-side searching
Server-side price filtering
Redux state management
Reusable React components
Responsive Swiper rendering
Axios instance for centralized API configuration

Food API supports pagination:

page
limit
skip

Example:

47 total foods
10 foods per request
5 total pages
🔎 Food Filtering

The backend supports multiple filters.

Category
?category=Chicken
Search
?search=spicy
Price
?minPrice=100&maxPrice=300
Availability
?isAvailable=true
Sorting
?sort=price-asc
Pagination
?page=1&limit=10

These filters can also be combined.

Example:

GET /api/food/items?category=Chicken&minPrice=100&maxPrice=300&sort=price-asc&page=1&limit=10
🧠 State Management

Redux Toolkit is used for global application state.

User State
{
    currentUser: null
}

Actions:

setUser()
clearUser()
Orders State

Used for:

Cart items
Food quantity
Order management
Clearing orders
🔄 Current User Flow

The application uses a reusable useCurrentUser hook.

Application Start
       ↓
Check Redux
       ↓
Is currentUser available?
       ↓
   YES ─────→ Don't call API
       │
       NO
       ↓
GET /api/auth/me
       ↓
setUser()
       ↓
Redux

This avoids unnecessary /me API calls when the user is already available in Redux.

🌍 Reverse Geocoding

The application uses browser geolocation:

navigator.geolocation.getCurrentPosition()

Coordinates are obtained:

latitude
longitude

Then reverse geocoding converts coordinates into an address using OpenStreetMap Nominatim.

Coordinates
     ↓
OpenStreetMap
     ↓
City + Full Address
     ↓
Backend
     ↓
MongoDB
     ↓
Redux
📦 Installation

Clone the repository:

git clone <your-repository-url>

Go to the frontend:

cd frontend
npm install

Go to the backend:

cd backend
npm install
🔑 Environment Variables
Backend

Create:

.env

Example:

PORT=3000


MONGO_URI=your_mongodb_connection_string


JWT_SECRET=your_jwt_secret


FRONTEND_URL=http://localhost:5173


IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
Frontend

Create:

.env

Example:

VITE_API_URL=http://localhost:3000

Never commit .env files or private API keys to GitHub.

▶️ Running Locally
Backend
cd backend
npm run dev

Backend:

http://localhost:3000
Frontend
cd frontend
npm run dev

Frontend:

http://localhost:5173
🧑‍💻 User Journey
Home
 ↓
Browse Menu
 ↓
Search / Filter Food
 ↓
Open Food
 ↓
Add to Orders
 ↓
Orders Page
 ↓
Check Delivery Location
 ↓
Add Location if Required
 ↓
Proceed to Payment
👨‍💼 Admin Journey
Admin Login
     ↓
Admin Authentication
     ↓
Admin Authorization
     ↓
Admin Upload Food
     ↓
Upload Image
     ↓
ImageKit
     ↓
Create Food
     ↓
MongoDB
     ↓
Food appears in Menu
🎯 Project Goals

The main goals of Dish & Co. are:

Build a complete MERN-stack application
Implement real-world authentication
Practice JWT and cookie-based authentication
Implement role-based authorization
Build scalable food APIs
Practice MongoDB filtering and pagination
Implement image storage using ImageKit
Build reusable React components
Manage global state with Redux Toolkit
Create responsive UI with Tailwind CSS
Implement real-world location handling
Create an admin food-management workflow
Improve frontend performance and user experience
🚧 Future Improvements

Planned improvements include:

Online payment gateway integration
Order history
Order tracking
Restaurant dashboard
Admin food edit/delete functionality
Admin order management
User reviews and ratings
Wishlist
Coupon system
Advanced food search
Infinite scrolling
Image optimization/transformation through ImageKit
Notifications
Email/SMS order confirmation
Better loading skeletons
Error boundaries
Production-level caching
📌 Project Status

Dish & Co. is currently under active development.

Current major modules:

✅ Authentication
✅ User Profile
✅ Redux User State
✅ Food Menu
✅ Food Filtering
✅ Food Pagination
✅ ImageKit Integration
✅ Location Detection
✅ Cart/Orders
✅ Admin Food Upload
✅ Role-Based Authorization
✅ Responsive UI
✅ Motion Animations
🚧 Payment Integration
🚧 Order History
🚧 Admin Order Management
👨‍💻 Developer

Mohd Talib

Built as a full-stack MERN project to demonstrate practical experience with:

React
Node.js
Express
MongoDB
Mongoose
JWT
Redux Toolkit
Tailwind CSS
ImageKit
REST APIs
Authentication
Authorization
Responsive UI