import { useDispatch, useSelector } from "react-redux";
import { clearOrders } from "../redux/orderSlice";

const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);

    const total = orders.reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-24 sm:px-8">
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
                                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                            >
                                <img
                                    src={order.foodImage}
                                    alt={order.foodName}
                                    className="h-20 w-20 rounded-xl object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <h2 className="truncate font-poppins font-semibold text-[#03071E]">
                                        {order.foodName}
                                    </h2>
                                    <p className="font-poppins text-sm text-gray-500">
                                        ₹{order.price} x {order.quantity}
                                    </p>
                                </div>
                                <p className="font-poppins font-semibold text-[#E85D04]">
                                    ₹{(order.price * order.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}

                        <div className="flex items-center justify-between border-t border-gray-200 pt-5">
                            <span className="font-poppins text-lg font-semibold text-[#03071E]">
                                Total
                            </span>
                            <span className="font-poppins text-xl font-bold text-[#E85D04]">
                                ₹{total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;