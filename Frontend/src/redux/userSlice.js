import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload // for data save current user****
        },
        clearUser: (state) => {
            state.currentUser = null; //**for logout
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;