'use client'
import React from 'react'
import { useAppSelector } from '@/lib/hooks'
import { TbEdit } from 'react-icons/tb'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

const MyProfile = () => {

    const params = useSearchParams();

    const { user } = useAppSelector(state => state.profile);
    const { image, firstName, lastName, email, additionalDetails: { contactNumber } } = user!;

    return (
        <div>
            <h1 className='text-[#F1F2FF] text-3xl font-medium font-inter'>My Profile</h1>
            <div className='flex flex-col items-center justify-center lg:w-[800px] w-full p-10 gap-11'>
                <div className='flex lg:flex-row flex-col lg:items-center justify-between w-full gap-5 p-6 border rounded-lg bg-[#161D29] border-[#2C333F]'>
                    <div className='flex items-center justify-center gap-5'>
                        <Image src={image} alt={`profile-${firstName}`} className='rounded-full' height={78} width={78} />
                        <div>
                            <p className='text-lg font-inter font-semibold text-[#F1F2FF]'>{firstName + " " + lastName}</p>
                            <p className='text-sm font-inter text-[#838894]'>{user?.email}</p>
                        </div>
                    </div>
                    <button className='bg-[#FFD60A] px-5 py-2 flex items-center justify-center rounded-lg gap-2'>
                        <TbEdit />
                        <p>Edit</p>
                    </button>
                </div>

                <div className='flex flex-col w-full gap-5 p-6 border rounded-lg bg-[#161D29] border-[#2C333F]'>

                    <div className='flex flex-col items-center w-full gap-5 lg:items-center lg:flex-row lg:justify-between'>
                        <h2 className='text-[#F1F2FF] text-lg font-semibold font-inter'>Personal Details</h2>
                        <button className='bg-[#FFD60A] w-full lg:w-auto px-5 py-2 flex items-center justify-center rounded-lg gap-2'>
                            <TbEdit />
                            <p>Edit</p>
                        </button>
                    </div>

                    <div className='flex items-center justify-between w-full lg:w-1/2'>
                        <div>
                            <p className='text-sm font-inter text-[#424854]'>First Name</p>
                            <p className='text-[#F1F2FF]'>{firstName}</p>
                        </div>
                        <div>
                            <p className='text-sm font-inter text-[#424854]'>Last Name</p>
                            <p className='text-[#F1F2FF]'>{lastName}</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-center w-full gap-1 lg:flex-row lg:w-[54%] lg:justify-between'>
                        <div className='flex gap-2 lg:flex-col'>
                            <p className='text-sm font-inter text-[#424854]'>Email</p>
                            <p className='text-sm font-inter text-[#838894]'>{email}</p>
                        </div>
                        <div className='flex gap-2 lg:flex-col'>
                            <p className='text-sm font-inter text-[#838894]'>Phone Number</p>
                            <p className='text-[#F1F2FF]'>{contactNumber}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MyProfile