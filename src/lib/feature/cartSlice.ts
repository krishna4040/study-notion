import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { course } from '../types'

interface cartState {
    cart: Array<course> | null;
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
        setTotalItems: (state, action) => {
            state.totalItems = action.payload
        },
        addToCart: (state, action: PayloadAction<course>) => {
            const course = action.payload;
            const index = state.cart!.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                return;
            }

            state.cart!.push(course);
            state.totalItems++;
            state.total += course.price;
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

export const { setTotalItems, addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;