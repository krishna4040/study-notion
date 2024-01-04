'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useAppDispatch } from "@/lib/hooks"
import Link from "next/link"

import { login } from "@/services/opr/auth"
import { ACCOUNT_TYPE } from "@/utils/constants"
import Tab from '@/components/common/Tab'
import { setImg } from '@/lib/feature/tabToogleSlice'
import { StaticImageData } from "next/image"

interface props {
    instructorimg: StaticImageData;
    studentimg: StaticImageData;
}

function LoginForm({ instructorimg, studentimg }: props) {

    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    useEffect(() => {
        if (accountType === "Student") {
            dispatch(setImg(studentimg));
        } else {
            dispatch(setImg(instructorimg));
        }
    }, [accountType]);

    const { email, password } = formData

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

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
        <form onSubmit={handleOnSubmit} className="flex flex-col w-full mt-6 gap-y-4">

            <Tab tabData={tabData} field={accountType} setField={setAccountType} />

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

            <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="form-style w-full !pr-10"
                />
                <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                    {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) :
                        (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                    }
                </span>
                <Link href="/forgot-password">
                    <p className="mt-1 ml-auto text-xs text-blue-100 max-w-max">
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                Sign In
            </button>
        </form>
    )
}

export default LoginForm
