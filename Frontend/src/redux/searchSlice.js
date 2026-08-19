import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            const searchTerm = action.payload?.trim();
            state.searchTerm = searchTerm || null;
        },
        clearSearch: (state) => {
            state.searchTerm = null;
        },
    },
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;