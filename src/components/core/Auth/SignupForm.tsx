'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useAppDispatch } from "@/lib/hooks"

import Tab from '../../common/Tab'
import { sendOtp } from "@/services/opr/auth"
import { setSignupData } from "@/lib/feature/authSlice"
import { ACCOUNT_TYPE } from "@/utils/constants"
import { useRouter } from "next/navigation"

function SignupForm({ setImg }: { setImg: React.Dispatch<React.SetStateAction<string>> }) {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    useEffect(() => {
        accountType === "Student" ? setImg("student") : setImg("Ins");
    }, [accountType]);

    // student or instructor
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Handle input fields, when some value changes
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    // Handle Form Submission
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        const signupData = {
            ...formData,
            accountType,
        }
        // Setting signup data to state
        // To be used after otp verification
        // Send OTP to user for verification
        dispatch(setSignupData(signupData));
        dispatch(sendOtp(formData.email, router));

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

    // data to pass to Tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

    return (
        <div>
            {/* Tab */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
            {/* Form */}
            <form onSubmit={handleOnSubmit} className="flex flex-col w-full gap-y-4">
                <div className="flex gap-x-4">
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            placeholder="Enter first name"
                            className="w-full form-style"
                        />
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            placeholder="Enter last name"
                            className="w-full form-style"
                        />
                    </label>
                </div>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        className="w-full form-style"
                    />
                </label>
                <div className="flex gap-x-4">
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            className="form-style w-full !pr-10"
                        />
                        <span
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showPassword ?
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> :
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            }
                        </span>
                    </label>
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            className="form-style w-full !pr-10"
                        />
                        <span
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showConfirmPassword ?
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> :
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            }
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm