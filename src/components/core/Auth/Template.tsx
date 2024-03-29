'use client'
// import { FcGoogle } from "react-icons/fc"
import { useAppSelector } from "@/lib/hooks"
import Image, { StaticImageData } from 'next/image'

import frameImg from "@/assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useState } from "react"

interface props {
    title: string;
    desc1: string;
    desc2: string;
    instructorimg: StaticImageData;
    studentimg: StaticImageData;
    formType: string;
}

function Template({ title, desc1, desc2, instructorimg, studentimg, formType }: props): JSX.Element {

    const { loading } = useAppSelector(state => state.auth)
    const [imgOf, setImgOf] = useState("student");

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ?
                    <div className="spinner"></div> :
                    <div className="flex flex-col-reverse justify-between w-11/12 py-12 mx-auto max-w-maxContent gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12">
                        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                                {title}
                            </h1>
                            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                                <span className="text-richblack-100">{desc1}</span>{" "}
                                <span className="italic font-bold text-blue-100 font-edu-sa">
                                    {desc2}
                                </span>
                            </p>
                            {formType === "signup" ? <SignupForm setImg={setImgOf} /> : <LoginForm setImg={setImgOf} />}
                        </div>
                        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                            <Image
                                src={frameImg}
                                alt="Pattern"
                                width={558}
                                height={504}
                                priority
                            />
                            <Image
                                src={imgOf === "student" ? studentimg : instructorimg}
                                alt="Students"
                                width={558}
                                height={504}
                                loading="lazy"
                                className="absolute z-10 -top-4 right-4"
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default Template
