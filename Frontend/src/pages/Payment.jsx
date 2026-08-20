import { ArrowLeft, CreditCard } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { removeOrderById } from "../redux/orderSlice";
import AxiosInstence from "../utils/AxiosInstence";
import { motion } from 'motion/react'

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
        <main className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-5 md:py-15 sm:px-8">

            {/* previous route buttton */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", damping: 12, stiffness: 400 }}
                type="button" onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 px-3 py-3 rounded-full font-poppins text-sm bg-[#F5F2EB] shadow-2xs text-[#F48C05]">
                <ArrowLeft size={18} /> Back
            </motion.button>

            <div className="mx-auto max-w-2xl flex flex-col-reverse">

                {/* random text about our delivery */}
                <div className="min-h-screen bg-[#F5F2EB] flex items-center justify-center px-4 py-10">

                    <div className=" w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16
            ">

                {/* image png left */}
                        <div className=" w-full flex justify-center md:justify-end
                ">
                            <motion.img
                            initial={{scale:0.5,opacity:0.5}}
                            whileInView={{scale:1, opacity:1}}
                            transition={{type:"spring",stiffness:200, damping:15}}
                                src="/images/order-food.png"
                                alt="Order food"
                                className=" w-full max-w-70 sm:max-w-87.5 md:max-w-105 lg:max-w-125 h-auto "
                            />
                        </div>

                        {/* right Content */}
                        <motion.div 
                        initial={{scale:0.5,opacity:0.5}}
                            whileInView={{scale:1, opacity:1}}
                            transition={{ease:"easeInOut",type:"spring",stiffness:200, damping:15}}
                        className="text-center md:text-left">

                            <p className=" font-poppins text-sm text-[#E85D04] font-medium mb-2
                    ">
                                YOUR ORDER
                            </p>

                            <h1 className=" font-cinzel text-4xl sm:text-5xl lg:text-6xl font-boldtext-[#03071E] leading-tight
                    ">
                                Good Food.
                                <br />
                                Good Mood.
                            </h1>

                            <p className=" mt-5 font-poppins text-sm sm:text-base text-gray-600 max-w-md mx-auto md:mx-0
                    ">
                                Your favorite meals are just a few clicks away.
                                Review your items, choose your delivery location
                                and place your order.
                            </p>
                        </motion.div>


                        
                    </div>

                </div>
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

                    {/* continue with payment * */}
                    <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", damping: 12, stiffness: 400 }}
                    type="button" onClick={handlePay} disabled={!selectedOrder || isPaying} className="mt-6 w-full rounded-full bg-[#E85D04] px-5 py-3 md:px-7 font-poppins text-white md:text-lg disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                        {isPaying ? "Opening Razorpay..." : "Continue with Razorpay"}
                    </motion.button>
                </section>
            </div>
        </main>
    );
};

export default Payment;