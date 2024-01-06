import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { course } from "../types";

interface courseState {
    step: number;
    course: course | null;
    editCourse: boolean;
    paymentLoading: boolean;
}

const initialState: courseState = {
    step: 1,
    course: null,
    editCourse: false,
    paymentLoading: false,
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload
        },
        setCourse: (state, action: PayloadAction<course>) => {
            state.course = action.payload
        },
        setEditCourse: (state, action: PayloadAction<boolean>) => {
            state.editCourse = action.payload
        },
        setPaymentLoading: (state, action: PayloadAction<boolean>) => {
            state.paymentLoading = action.payload
        },
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.editCourse = false
        }
    }
});

export const {
    setStep,
    setCourse,
    setEditCourse,
    setPaymentLoading,
    resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer