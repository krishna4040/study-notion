import { toast } from "react-hot-toast"
import { setUser } from "@/lib/feature/profileSlice"
import { settingsEndpoints } from "../api"
import { logout } from "./auth"
import axios from 'axios'
import { AppDispatch } from "@/lib/store"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints
interface formValues {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "Male" | "Female" | "Non-Binary" | "Prefer not to say" | "Other";
    contactNumber: number;
    about: string;
}

export function updateDisplayPicture(token: string, formData: formValues) {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await axios.put(UPDATE_DISPLAY_PICTURE_API, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
        } catch (error) {
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }
}

export function updateProfile(token: string, formData: formValues) {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await axios.put(UPDATE_PROFILE_API, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            const userImage = response.data.updatedUserDetails.image
                ? response.data.updatedUserDetails.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
            dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }));
            toast.success("Profile Updated Successfully")
        } catch (error) {
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
    }
}

export async function changePassword(token: string, formData: formValues) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await axios.post(CHANGE_PASSWORD_API, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Password Changed Successfully")
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function deleteProfile(token: string, router: AppRouterInstance) {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await axios.delete(DELETE_PROFILE_API);
            console.log("DELETE_PROFILE_API API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            logout(router)(dispatch);
        } catch (error) {
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}
