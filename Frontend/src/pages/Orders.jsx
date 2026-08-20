import { useDispatch, useSelector } from "react-redux";
import { clearOrders } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { X, ArrowLeft, MapPin, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

import AddLocation from "../components/AddLocation";
import AxiosInstence from "../utils/AxiosInstence";

const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orders = useSelector((state) => state.orders.orders);
    const currentUser = useSelector((state) => state.user.currentUser);

    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Check location
    const hasLocation = Boolean(
        currentUser?.location?.city &&
        currentUser?.location?.fullAddress
    );

    // Proceed button
    const handleProceedToPayment = async (order) => {
        try {
            // Save selected order
            setSelectedOrder(order);

            // Location already exists
            if (hasLocation) {
                navigateToPayment(order);
                return;
            }

            // Location doesn't exist
            setShowLocationPopup(true);

        } catch (error) {
            console.error(error);
        }
    };

    // Navigate to payment
    const navigateToPayment = async (order) => {
        try {
            const response = await AxiosInstence.get(
                `/api/food/items/${order._id}`
            );

            navigate("/payment", {
                state: {
                    order: {
                        ...response.data.food,
                        quantity: order.quantity,
                    },
                },
            });

        } catch (error) {
            console.error(
                "Unable to fetch selected food:",
                error.response?.data || error.message
            );
        }
    };

    // Location successfully added****
    const handleLocationAdded = () => {
        setShowLocationPopup(false);

        if (selectedOrder) {
            navigateToPayment(selectedOrder);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-4 sm:px-8 md:py-15">

            {/* Back */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                type="button"
                onClick={() => navigate(-1)}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F5F2EB] px-3 py-3 font-poppins text-sm text-[#F48C05] shadow-sm cursor-pointer"
            >
                <ArrowLeft size={18} />
                Back
            </motion.button>

            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <p className="font-poppins text-sm text-[#E85D04]">
                            Your selection
                        </p>

                        <h1 className="font-cinzel text-3xl font-bold text-[#03071E]">
                            Orders
                        </h1>
                    </div>

                    {orders.length > 0 && (
                        <button
                            type="button"
                            onClick={() => dispatch(clearOrders())}
                            className="rounded-full border border-[#E85D04] px-4 py-2 font-poppins text-sm text-[#E85D04] transition hover:bg-[#E85D04] hover:text-white cursor-not-allowed"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {/* Empty Cart */}
                {orders.length === 0 ? (

                    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                        <h2 className="font-cinzel text-xl font-semibold text-[#03071E]">
                            Your cart is empty
                        </h2>

                        <p className="mt-2 font-poppins text-sm text-gray-500">
                            Select a food from the menu to add it here.
                        </p>
                    </div>

                ) : (

                    /* Orders */
                    <div className="space-y-4">

                        {orders.map((order) => (

                            <div
                                key={order._id}
                                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-white p-3 shadow-sm sm:gap-4 sm:p-4"
                            >

                                {/* Image */}
                                <img
                                    src={order.foodImage}
                                    alt={order.foodName}
                                    className="h-16 w-16 rounded-xl object-cover sm:h-20 sm:w-20"
                                    loading="lazy"
                                />

                                {/* Details */}
                                <div className="min-w-0">
                                    <h2 className="truncate font-poppins font-semibold text-[#03071E]">
                                        {order.foodName}
                                    </h2>

                                    <p className="font-poppins text-sm text-gray-500">
                                        ₹{order.price} × {order.quantity}
                                    </p>
                                </div>

                                {/* Price + Payment */}
                                <div className="flex flex-col items-end gap-3">

                                    <p className="whitespace-nowrap font-poppins text-sm font-semibold text-[#E85D04]">
                                        ₹{(order.price * order.quantity).toFixed(2)}
                                    </p>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 12 }}
                                        type="button"
                                        onClick={() =>
                                            handleProceedToPayment(order)
                                        }
                                        className="whitespace-nowrap rounded-full bg-[#E85D04] px-3 py-2 font-poppins text-xs text-white transition hover:bg-[#F48C05] sm:px-4 sm:py-3 cursor-pointer"
                                    >
                                        Proceed to payment
                                    </motion.button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}
            </div>

            {/* ==== LOCATION POPUP ======= */}

            {showLocationPopup && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                    >

                        {/* Close */}
                        <button
                            type="button"
                            onClick={() => setShowLocationPopup(false)}
                            className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                        <MapPin
                            className="mb-3 text-[#E85D04]"
                            size={30}
                        />

                        <p className="font-poppins text-sm text-[#E85D04]">
                            Delivery address required
                        </p>

                        <h2 className="mt-1 pr-8 font-cinzel text-2xl font-bold text-[#03071E]">
                            Add your location
                        </h2>

                        <p className="mt-2 font-poppins text-sm text-gray-500">
                            We need your delivery location before continuing
                            to payment.
                        </p>

                        <div className="mt-6">
                            <AddLocation
                                onLocationAdded={handleLocationAdded}
                            />
                        </div>

                    </motion.div>

                </div>
            )}

            {/* ================= LOCATION CARD ================= */}

            {hasLocation && selectedOrder && !showLocationPopup && (

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-white p-4 shadow-2xl border"
                >

                    <div className="flex items-start gap-3">

                        <div className="rounded-full bg-green-100 p-2">
                            <CheckCircle
                                size={20}
                                className="text-green-600"
                            />
                        </div>

                        <div className="min-w-0 flex-1">

                            <p className="font-poppins text-xs text-gray-500">
                                Delivery location
                            </p>

                            <h3 className="font-poppins font-semibold text-[#03071E]">
                                {currentUser.location.city}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                                {currentUser.location.fullAddress}
                            </p>

                        </div>

                    </div>

                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigateToPayment(selectedOrder)}
                        className="mt-4 w-full rounded-full bg-[#E85D04] py-3 font-poppins text-sm font-medium text-white hover:bg-[#F48C05]"
                    >
                        Continue to Payment
                    </motion.button>

                </motion.div>
            )}

        </div>
    );
};

export default Orders;