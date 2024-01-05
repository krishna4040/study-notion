'use client'
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { changePassword } from "../../../../services/opr/settings"

export default function UpdatePassword() {

    const { token } = useAppSelector(state => state.auth)
    const router = useRouter()

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitPasswordForm = async (data: any) => {
        try {
            await changePassword(token!, data)
        } catch (error: any) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitPasswordForm)}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="oldPassword" className="lable-style">
                                Current Password
                            </label>
                            <input
                                type={showOldPassword ? "text" : "password"}
                                id="oldPassword"
                                placeholder="Enter Current Password"
                                className="form-style"
                                {...register("oldPassword", { required: true })}
                            />
                            <span
                                onClick={() => setShowOldPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    showOldPassword ?
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> :
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                }
                            </span>
                            {
                                errors.oldPassword &&
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Current Password.
                                </span>
                            }
                        </div>
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="newPassword" className="lable-style">
                                New Password
                            </label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                placeholder="Enter New Password"
                                className="form-style"
                                {...register("newPassword", { required: true })}
                            />
                            <span
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    showNewPassword ?
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> :
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                }
                            </span>
                            {
                                errors.newPassword &&
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your New Password.
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            router.push("/dashboard/my-profile")
                        }}
                        className="px-5 py-2 font-semibold rounded-md cursor-pointer bg-richblack-700 text-richblack-50"
                    >
                        Cancel
                    </button>
                    <button>Update</button>
                </div>
            </form>
        </>
    )
}
