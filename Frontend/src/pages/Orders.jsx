import { useDispatch, useSelector } from "react-redux";
import { clearOrders } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";
import AddLocation from "../components/AddLocation";
import AxiosInstence from "../utils/AxiosInstence";

const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector((state) => state.orders.orders);
    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const pendingOrder = null;

    const handleProceedToPayment = async (order) => {
        try {
            const response = await AxiosInstence.get(
                `/api/food/items/${order._id}`
            );

            console.log("Selected food from backend:", response.data.food);
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



    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-1.5 md:py-24 sm:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <p className="font-poppins text-sm text-[#E85D04]">Your selection</p>
                        <h1 className="font-cinzel text-3xl font-bold text-[#03071E]">
                            Orders
                        </h1>
                    </div>
                    {orders.length > 0 && (
                        <button
                            type="button"
                            onClick={() => dispatch(clearOrders())}
                            className="rounded-full border border-[#E85D04] px-4 py-2 font-poppins text-sm text-[#E85D04] transition hover:bg-[#E85D04] hover:text-white"
                        >
                            Clear all
                        </button>
                    )}
                </div>

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
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-white p-3 shadow-sm sm:gap-4 sm:p-4"
                            >
                                <img
                                    src={order.foodImage}
                                    alt={order.foodName}
                                    className="h-16 w-16 rounded-xl object-cover sm:h-20 sm:w-20"
                                />
                                <div className="min-w-0 flex-1">
                                    <h2 className="truncate font-poppins font-semibold text-[#03071E]">
                                        {order.foodName}
                                    </h2>
                                    <p className="font-poppins text-sm text-gray-500">
                                        ₹{order.price} x {order.quantity}
                                    </p>
                                </div>
                                <div className="flex min-w-0 flex-col items-end gap-9">
                                    <p className="whitespace-nowrap font-poppins text-sm font-semibold text-[#E85D04] sm:text-base">
                                        ₹{(order.price * order.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => handleProceedToPayment(order)}
                                        className="whitespace-nowrap rounded-full bg-[#E85D04] px-3 py-2 font-poppins text-sm text-white transition hover:bg-[#F48C05] sm:px-4 sm:py-3 sm:text-[11px]"
                                    >
                                        Proceed to payment
                                    </button>
                                </div>
                            </div>
                        ))}


                    </div>
                )}
            </div>

            {showLocationPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setShowLocationPopup(false)}
                            aria-label="Close location popup"
                            className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>

                        <p className="font-poppins text-sm text-[#E85D04]">
                            Delivery address required
                        </p>
                        <h2 className="mt-1 pr-8 font-cinzel text-2xl font-bold text-[#03071E]">
                            Add your location
                        </h2>
                        <p className="mt-2 font-poppins text-sm text-gray-500">
                            Add a delivery location before continuing to payment.
                        </p>

                        <div className="mt-6 flex justify-end">
                            <AddLocation
                                onLocationAdded={() => {
                                    setShowLocationPopup(false);
                                    navigate("/payment", { state: { order: pendingOrder } });
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;