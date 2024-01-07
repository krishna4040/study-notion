'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { resetPassword } from '@/services/opr/auth'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

const UpdatePassword = () => {

    const router = useRouter();
    const pathname = usePathname();
    const dispacth = useAppDispatch();
    const { loading } = useAppSelector(state => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formdata, setFormdata] = useState({ password: '', confirmPassword: '' })
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFormdata(prev => {
            return { ...prev, [event.target.name]: event.target.value }
        });
    }
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = pathname.split('/').at(-1);
        dispacth(resetPassword(formdata.password, formdata.confirmPassword, token!, router));
    }

    return (
        <div className='flex items-center justify-center'>
            {
                loading ? <div>Loading...</div> :
                    <div className='flex flex-col justify-center gap-3 p-4 lg:mt-32 mt-60 max-w-maxContent'>
                        <h1 className='text-2xl text-richblack-5'>Choose New Password</h1>
                        <p className='text-[#AFB2BF]'>Almost done. Enter Your New Password and you are all set..</p>
                        <form action="" onSubmit={submitHandler} className='flex flex-col gap-2'>
                            <label htmlFor="password" className='relative'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>New Password<sup className="text-pink-200">*</sup></p>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formdata.password}
                                    onChange={changeHandler}
                                    className='w-full border form-style'
                                />
                                <span onClick={() => { setShowPassword(prev => !prev) }} className='absolute right-3 bottom-3'>
                                    {showPassword ? <AiFillEyeInvisible className='text-2xl text-white' /> : <AiFillEye className='text-2xl text-white' />}
                                </span>
                            </label>
                            <label htmlFor="confirmPassword" className='relative'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm New Password<sup className="text-pink-200">*</sup></p>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formdata.confirmPassword}
                                    onChange={changeHandler}
                                    className='w-full form-style'
                                />
                                <span onClick={() => { setShowConfirmPassword(prev => !prev) }} className='absolute right-3 bottom-3'>
                                    {showConfirmPassword ? <AiFillEyeInvisible className='text-2xl text-white' /> : <AiFillEye className='text-2xl text-white' />}
                                </span>
                            </label>
                            <button type='submit' className='w-full mt-4 bg-[#FFD60A] rounded-lg p-3 font-semibold'>Reset Password</button>
                        </form>
                        <div>
                            <Link href='/login'>
                                <div className='flex items-center text-white'>
                                    <AiOutlineArrowLeft />
                                    <p>Back to Login</p>
                                </div>
                            </Link>
                        </div>
                    </div>
            }
        </div>
    )
}

export default UpdatePassword