import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;