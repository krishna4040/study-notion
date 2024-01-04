import React from 'react'
import HighLightText from './HighLightText'
import Button from './Button'
import Know_your_progress from '@/assets/Images/Know_your_progress.png'
import Compare_with_others from '@/assets/Images/Compare_with_others.png'
import Plan_your_lessons from '@/assets/Images/Plan_your_lessons.png'
import Image from 'next/image'

const LearningLanguageSection = () => {
    return (
        <div className='flex flex-col items-center gap-5 mb-32 mt-36'>

            <div className='text-3xl font-semibold lg:text-4xl lg:text-center'>
                Your swiss Knife for
                <HighLightText text={'learning any language'} />
            </div>

            <div className='mx-auto text-base font-medium lg:text-center text-richblack-600 lg:w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-col items-center justify-center mt-5 lg:flex-row'>

                <Image src={Know_your_progress} alt="#" className='-mb-20 lg:-mr-28 lg:mb-0' />
                <Image src={Compare_with_others} alt="#" className='' />
                <Image src={Plan_your_lessons} alt="#" className='-mt-20 lg:-ml-40 lg:mt-0' />

            </div>

            <Button active={true} linkto={'/signup'} text={'Learn more'} />

        </div>
    )
}

export default LearningLanguageSection