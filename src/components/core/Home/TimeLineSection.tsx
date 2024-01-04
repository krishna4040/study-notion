import React from 'react'
import logo1 from '@/assets/TimeLineLogo/Logo1.svg'
import logo2 from '@/assets/TimeLineLogo/logo2.svg'
import logo3 from '@/assets/TimeLineLogo/logo3.svg'
import logo4 from '@/assets/TimeLineLogo/logo4.svg'
import timeimg from '@/assets/Images/TimeLineImage.png'
import Image, { StaticImageData } from 'next/image'

interface tl {
    logo: StaticImageData,
    heading: string,
    description: string
}

const timeline: Array<tl> = [
    { logo: logo1, heading: "Leadership", description: "Fully committed to the success company" },
    { logo: logo2, heading: "Responsibility", description: "Students will always be our top priority" },
    { logo: logo3, heading: "Flexibility", description: "The ability to switch is an important skills" },
    { logo: logo4, heading: "Solve the problem", description: "Code your way to a solution" },
]

const TimeLineSection = () => {
    return (
        <div className='flex flex-col items-center lg:flex-row gap-14'>

            <div className='w-[45%] flex flex-col gap-5'>

                {
                    timeline.map((element, index) => {
                        return (
                            <div className='flex gap-6' key={index}>

                                <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full'>
                                    <Image src={element.logo} alt="#" />
                                </div>

                                <div>
                                    <h2 className='font-bold text-[#161D29]'>{element.heading}</h2>
                                    <p>{element.description}</p>
                                </div>

                            </div>
                        )
                    })
                }

            </div>

            <div className='relative shadow-blue-200'>

                <Image src={timeimg} alt="#" className='object-cover shadow-white h-fit' />

                <div className='absolute flex py-10 text-white uppercase bg-caribbeangreen-700 left-1/2 translate-x-[-50%] -translate-y-[50%]'>

                    <div className='flex items-center gap-5 border-r border-caribbeangreen-300 px-7'>
                        <h1 className='text-3xl font-bold'>10</h1>
                        <p className='text-sm text-caribbeangreen-300'>Years of Experience</p>
                    </div>

                    <div className='flex items-center gap-5 border-r border-caribbeangreen-300 px-7'>
                        <h1 className='text-3xl font-bold'>250</h1>
                        <p className='text-sm text-caribbeangreen-300'>Type of courses</p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default TimeLineSection