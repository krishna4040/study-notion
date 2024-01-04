import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { section, subSection, course } from "../types";

interface viewCourseState {
    courseSectionData: Array<section>;
    courseEntireData: Array<course>;
    completedLectures: Array<subSection>;
    totalNoOfLectures: number;
}

const initialState: viewCourseState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action: PayloadAction<Array<section>>) => {
            state.courseSectionData = action.payload
        },
        setEntireCourseData: (state, action: PayloadAction<Array<course>>) => {
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action: PayloadAction<number>) => {
            state.totalNoOfLectures = action.payload
        },
        setCompletedLectures: (state, action: PayloadAction<Array<subSection>>) => {
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action: PayloadAction<subSection>) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },
    },
})

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer
