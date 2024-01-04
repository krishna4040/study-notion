import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { course } from '../types'

interface cartState {
    cart: Array<course> | null;
    total: number;
    totalItems: number;
}

const initialState: cartState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")!) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")!) : 0,
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
                toast.error("Course already in cart");
                return;
            }

            state.cart!.push(course);
            state.totalItems++;
            state.total += course.price;

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            toast.success("Course added to cart")
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const courseId = action.payload;
            const index = state.cart!.findIndex((item) => item._id === courseId);

            if (index >= 0) {
                state.totalItems--;
                state.total -= state.cart![index].price
                state.cart!.splice(index, 1)

                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

                toast.success("Course removed from cart")
            }
        },
        resetCart: (state, action) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0

            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
});

export const { setTotalItems, addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;