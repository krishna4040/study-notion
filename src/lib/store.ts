import { configureStore } from '@reduxjs/toolkit'
import authReducer from './feature/authSlice'
import cartReducer from './feature/cartSlice'
import profileReducer from './feature/profileSlice'
import viewCourseReducer from './feature/viewCourseSlice'
import courseReducer from './feature/courseSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        cart: cartReducer,
        viewCourse: viewCourseReducer,
        course: courseReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch