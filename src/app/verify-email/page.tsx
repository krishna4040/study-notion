'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import OTPInput from 'react-otp-input'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { sendOtp, signUp } from '@/services/opr/auth'

const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const { loading, signupData } = useAppSelector((state) => state.auth);
    const dispacth = useAppDispatch();
    const router = useRouter();

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { accountType, firstName, lastName, email, password, confirmPassword } = signupData!;
        dispacth(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp));
    }

    useEffect(() => {
        if (!signupData) {
            router.push('/signup');
        }
    }, [])

    return (
        <div className='flex items-center justify-center lg:w-[508px] lg:h-[448px] p-3 my-auto mx-auto'>
            {
                loading ? <div className='text-white'>Loading...</div> :
                    <div className='flex flex-col justify-center w-full gap-5'>
                        <h1 className='w-full text-2xl text-richblack-5'>Verify Email</h1>
                        <p className='text-[#AFB2BF]'>A verification code has been sent to you. Enter The code</p>
                        <form action="" onSubmit={submitHandler} className='flex flex-col w-full gap-5'>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => (<input {...props} style={{ width: "60px", boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }} placeholder='-' className=' border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"' />)}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                }}
                            />
                            <button type='submit' className='w-full bg-[#FFD60A] rounded-lg p-3 font-semibold mx-auto'>
                                Verify Email
                            </button>
                        </form>
                        <div className='flex items-center justify-between gap-4'>
                            <Link href='/login'>
                                <div className='flex items-center text-white'>
                                    <AiOutlineArrowLeft />
                                    <p>Back to Login</p>
                                </div>
                            </Link>

                            <button onClick={() => { dispacth(sendOtp(signupData?.email!)) }} className='flex items-center justify-center gap-2'>
                                <p className='text-[#47A5C5]'>Reset it</p>
                            </button>

                        </div>
                    </div>
            }
        </div>
    )
}

export default VerifyEmail  