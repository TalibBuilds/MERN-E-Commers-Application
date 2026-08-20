import { ArrowLeft, CreditCard } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { removeOrderById } from "../redux/orderSlice";
import AxiosInstence from "../utils/AxiosInstence";

const loadRazorpay = () => new Promise((resolve) => {
    if (window.Razorpay) {
        resolve(true);
        return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
});

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const selectedOrder = state?.order;
    const [isPaying, setIsPaying] = useState(false);

    const handlePay = async () => {
        const foodId = selectedOrder?._id || selectedOrder?.id;

        if (!foodId) {
            toast.error("No valid food selected");
            return;
        }

        setIsPaying(true);

        try {
            const isRazorpayLoaded = await loadRazorpay();
            if (!isRazorpayLoaded) throw new Error("Razorpay checkout could not load");

            const { data } = await AxiosInstence.post("/api/orders/payment-order", {
                items: [{ foodId, quantity: selectedOrder.quantity }],
            });

            const razorpay = new window.Razorpay({
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: "Dish & Co",
                description: data.item.foodName,
                order_id: data.razorpayOrderId,
                handler: async (paymentResponse) => {
                    try {
                        await AxiosInstence.post("/api/orders/verify-payment", {
                            orderId: data.orderId,
                            razorpayOrderId: paymentResponse.razorpay_order_id,
                            razorpayPaymentId: paymentResponse.razorpay_payment_id,
                            razorpaySignature: paymentResponse.razorpay_signature,
                        });
                        dispatch(removeOrderById(foodId));
                        toast.success("Payment successful");
                        navigate("/orders");
                    } catch (error) {
                        toast.error(error.response?.data?.message || "Payment verification failed");
                    } finally {
                        setIsPaying(false);
                    }
                },
                modal: { ondismiss: () => setIsPaying(false) },
                theme: { color: "#E85D04" },
            });

            razorpay.on("payment.failed", () => {
                setIsPaying(false);
                toast.error("Payment failed");
            });
            razorpay.open();
        } catch (error) {
            setIsPaying(false);
            toast.error(error.response?.data?.message || error.message || "Unable to start payment");
        }
    };

    return (
        <main className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-24 sm:px-8">
            <div className="mx-auto max-w-2xl">
                <button type="button" onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-[#03071E]/65">
                    <ArrowLeft size={18} /> Back to cart
                </button>
                <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-center gap-2 text-[#E85D04]"><CreditCard size={20} /><span className="font-poppins text-sm">Secure checkout</span></div>
                    <h1 className="mt-2 font-cinzel text-3xl font-bold text-[#03071E]">Pay with Razorpay</h1>
                    {selectedOrder ? (
                        <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#FFF7ED] p-4">
                            <img src={selectedOrder.foodImage} alt={selectedOrder.foodName} className="h-16 w-16 rounded-lg object-cover" />
                            <div><p className="font-poppins font-semibold text-[#03071E]">{selectedOrder.foodName}</p><p className="font-poppins text-sm text-gray-500">Quantity: {selectedOrder.quantity}</p></div>
                        </div>
                    ) : <p className="mt-6 rounded-xl bg-red-50 p-4 font-poppins text-sm text-red-600">No order selected.</p>}
                    <p className="mt-6 font-poppins text-sm text-gray-500">The final amount is calculated from the current database price on the server.</p>
                    <button type="button" onClick={handlePay} disabled={!selectedOrder || isPaying} className="mt-6 w-full rounded-full bg-[#E85D04] px-5 py-3 font-poppins font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                        {isPaying ? "Opening Razorpay..." : "Continue with Razorpay"}
                    </button>
                </section>
            </div>
        </main>
    );
};

export default Payment;