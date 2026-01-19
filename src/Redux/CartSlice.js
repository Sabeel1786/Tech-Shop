import { createSlice } from "@reduxjs/toolkit";

const MAX_QTY = 5;

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const existingItem = state.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {
                if (existingItem.quantity < MAX_QTY) {
                    existingItem.quantity += 1;
                }
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },

        removeFromCart(state, action) {
            return state.filter(
                item => item.id !== action.payload.id
            );
        },

        removeItem(state, action) {
            const item = state.find(
                item => item.id === action.payload.id
            );

            if (!item) return;

            if (item.quantity === 1) {
                return state.filter(
                    item => item.id !== action.payload.id
                );
            } else {
                item.quantity -= 1;
            }
        },

        increaseItems(state, action) {
            const item = state.find(
                item => item.id === action.payload.id
            );

            if (item && item.quantity < MAX_QTY) {
                item.quantity += 1;
            }
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    removeItem,
    increaseItems
} = cartSlice.actions;

export default cartSlice.reducer;
