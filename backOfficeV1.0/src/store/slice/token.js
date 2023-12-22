import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "token",
    initialState: {
        value: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.value = {
                headers: {
                    Authorization: `Bearer ${action.payload}`,
                },
            };
        },
        clearToken: (state) => {
            state.value = null;
        },
    },
});

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
