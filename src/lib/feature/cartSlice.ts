import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { course } from '../types'

interface cartState {
    cart: Array<course>;
    total: number;
    totalItems: number;
}

const initialState: cartState = {
    cart: [],
    total: 0,
    totalItems: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<course[]>) => {
            state.cart = action.payload;
        },
        setTotalItems: (state, action) => {
            state.totalItems = action.payload
        },
        addToCart: (state, action: PayloadAction<course>) => {
            state.cart.push(action.payload);
            state.totalItems++;
            state.total += action.payload.price;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const courseId = action.payload;
            const index = state.cart!.findIndex((item) => item._id === courseId);

            if (index >= 0) {
                state.totalItems--;
                state.total -= state.cart![index].price;
                state.cart!.splice(index, 1);
            }
        },
        resetCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
        }
    }
});

export const { setTotalItems, addToCart, removeFromCart, resetCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;