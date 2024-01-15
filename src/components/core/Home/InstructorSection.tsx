import React from 'react'
import instructor from '@/assets/Images/Instructor.png'
import HighLightText from './HighLightText'
import Button from './Button'
import Image from 'next/image'

const InstructorSection = () => {
    return (
        <div className='flex flex-col-reverse items-center gap-12 mt-16 lg:gap-20 lg:flex-row'>

            <div className='lg:w-1/2'>
                <Image src={instructor} alt="#" className='shadow-white' />
                <div className='block mt-12 lg:hidden'><Button active={true} linkto={'/signup'} text={'Start learning today'} arrow={true} /></div>
            </div>

            <div className='flex flex-col gap-5 lg:w-1/2'>

                <p className='text-4xl font-semibold'>Become an <br /> <HighLightText text={'Instructor'} /></p>

                <p className='text-base font-medium lg:w-4/5 text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='hidden lg:block'><Button active={true} linkto={'/signup'} text={'Start learning today'} arrow={true} /></div>

            </div>

        </div>
    )
}

export default InstructorSection