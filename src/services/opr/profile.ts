import { toast } from "react-hot-toast"
import axios from 'axios'
import { setLoading, setUser } from "@/lib/feature/profileSlice"
import { profileEndpoints } from "../api"
import { logout } from "./auth"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { AppDispatch } from "@/lib/store"

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API,
} = profileEndpoints

export function getUserDetails(token: string, router: AppRouterInstance) {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await axios.get(GET_USER_DETAILS_API, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.image
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
            dispatch(logout(router));
            toast.error("Could Not Get User Details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getUserEnrolledCourses(token: string) {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await axios.get(GET_USER_ENROLLED_COURSES_API, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data;
    } catch (error) {
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result;
}

export async function getInstructorData(token: string) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const { data } = await axios.get(GET_INSTRUCTOR_DATA_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        result = data?.courses;
    } catch (error) {
        toast.error("Could Not Get Instructor Data")
    }
    toast.dismiss(toastId)
    return result
}
