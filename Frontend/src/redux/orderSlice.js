import { createSlice } from "@reduxjs/toolkit";

const getStoredOrders = () => {
    try {
        return JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
        return [];
    }
};

const initialState = {
    orders: getStoredOrders(),
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
            state.error = null;
        },
        addOrder: (state, action) => {
            const existingOrder = state.orders.find(
                (order) => order._id === action.payload._id
            );

            if (existingOrder) {
                existingOrder.quantity += action.payload.quantity;
            } else {
                state.orders.unshift(action.payload);
            }
        },
        clearOrders: (state) => {
            state.orders = [];
        },
        removeOrderById: (state, action) => {
            state.orders = state.orders.filter(
                (order) => order._id !== action.payload
            );
        },
        setOrdersLoading: (state, action) => {
            state.loading = action.payload;
        },
        setOrdersError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setOrders,
    addOrder,
    clearOrders,
    removeOrderById,
    setOrdersLoading,
    setOrdersError,
} = orderSlice.actions;

export default orderSlice.reducer;