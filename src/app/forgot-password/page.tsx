'use client'
import React, { FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Link from 'next/link'
import { getPasswordResetToken } from '@/services/opr/auth'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const { loading } = useAppSelector(state => state.auth);
    const dispacth = useAppDispatch();

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispacth(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='flex items-center justify-center lg:w-[508px] lg:h-[448px] p-3 my-auto mx-auto'>
            {
                loading ?
                    (<div>Loading...</div>) :
                    (<div className='flex flex-col justify-center gap-5'>

                        <h1 className='text-2xl text-richblack-5'>
                            {!emailSent ? "Reset Your Password" : "Check Your Email"}
                        </h1>

                        <p className='text-[#AFB2BF]'>
                            {!emailSent ? `Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery` : `We have sent the reset email to your email account ${email}`}
                        </p>

                        <form action="" onSubmit={submitHandler} className='flex flex-col gap-5'>

                            {
                                !emailSent && (
                                    <label htmlFor="">
                                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address<sup className="text-pink-200">*</sup></p>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            placeholder='Enter Your Email'
                                            className='w-full form-style'
                                        />
                                    </label>
                                )
                            }
                            <button type='submit' className='w-full bg-[#FFD60A] rounded-lg p-3 font-semibold'>
                                {!emailSent ? "Reset Password" : "Resend Email"}
                            </button>
                        </form>

                        <div>
                            <Link href='/login'>
                                <div className='flex items-center text-white'>
                                    <AiOutlineArrowLeft />
                                    <p>Back To Login</p>
                                </div>
                            </Link>
                        </div>

                    </div>)
            }
        </div>
    )
}

export default ForgotPassword