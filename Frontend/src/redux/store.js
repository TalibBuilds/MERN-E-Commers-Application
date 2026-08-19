import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import searchReducer from './searchSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        orders: orderReducer,
    }
});

store.subscribe(() => {
    localStorage.setItem("orders", JSON.stringify(store.getState().orders.orders));
});