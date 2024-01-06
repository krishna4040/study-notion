import { toast } from "react-hot-toast"
import axios from 'axios'
import { setLoading, setToken } from "@/lib/feature/authSlice"
import { resetCart } from "@/lib/feature/cartSlice"
import { setUser } from "@/lib/feature/profileSlice"
import { endpoints } from "../api"
import { AppDispatch } from "@/lib/store"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// Destructuring from endpoints
const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API } = endpoints

export function sendOtp(email: string, router: AppRouterInstance) {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const { data } = await axios.post(SENDOTP_API, { email });
            if (!data.success) {
                throw new Error(data.message)
            }
            toast.success("OTP Sent Successfully")
            router.push("/verify-email")
        } catch (error: any) {
            toast.error("Could Not Send OTP")
            console.log(error);
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    otp: string,
    router: AppRouterInstance
) {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await axios.post(SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            router.push("/login")
        } catch (error: any) {
            console.log(error);
            toast.error("Signup Failed")
            router.push("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email: string, password: string, router: AppRouterInstance) {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await axios.post(LOGIN_API, {
                email,
                password
            });

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token))
            router.push("/dashboard/my-profile");
        } catch (error: any) {
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const getPasswordResetToken = (email: string, setEmailSent: Function) => {
    return async (dispacth: AppDispatch) => {
        dispacth(setLoading(true));
        try {
            const response = await axios.post(RESETPASSTOKEN_API, { email });
            console.log("Reset password token response...", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
            dispacth(setLoading(false));
        } catch (error) {
            console.log("Error message", error);
        }
    }
}

export function resetPassword(password: string, confirmPassword: string, token: string, router: AppRouterInstance) {
    return async (dispatch: AppDispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await axios.post(RESETPASSWORD_API, {
                password,
                confirmPassword,
                token
            })

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password Reset Successfully")
            router.push("/login")
        } catch (error: any) {
            toast.error("Failed To Reset Password")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function logout(router: AppRouterInstance) {
    return (dispatch: AppDispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        router.push("/")
    }
}
