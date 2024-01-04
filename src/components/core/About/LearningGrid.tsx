import React from 'react'
import HighLightText from '../Home/HighLightText'
import Button from '../Home/Button'

const arr = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highLightText: "Anyone, Anywhere",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText: "Learn More",
        btnLink: "/"
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: "The learning process uses the namely online and offline."
    },
    {
        order: 3,
        heading: "Certification",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, fugiat."
    },
    {
        order: 4,
        heading: "Ready to Work",
        description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    },
    {
        order: 5,
        heading: "Rating 'Auto-grading'",
        description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },
]

const LearningGrid = () => {
    return (
        <div className='grid grid-cols-1 text-white lg:grid-cols-4'>
            {
                arr.map((element, index) => {
                    return (
                        <div className={`${index == 0 ? 'lg:col-span-2 bg-richblack-900' : ''} ${(element.order % 2 === 1 && index != 0) ? 'bg-richblack-700' : 'bg-richblack-800'} ${element.order == 3 && 'lg:col-start-2'} h-[300px]`} key={index}>
                            {
                                element.order < 0 ? (
                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <h1 className='text-4xl font-semibold text-white font-inter'>{element.heading}</h1>
                                            <span className='bg-gradient-to-b from-[#5433FF] via-[#20BDFF] to-[#A5FECB] text-transparent bg-clip-text font-semibold font-inter text-4xl'>{element.highLightText}</span>
                                        </div>
                                        <p className='text-[#838894] font-inter font-medium'>{element.description}</p>
                                        <Button active={true} linkto={element.btnLink!} text={element.btnText!} />
                                    </div>
                                ) :
                                    (
                                        <div className='flex flex-col gap-8 p-8'>
                                            <h1>{element.heading}</h1>
                                            <p className='text-[#AFB2BF] text-sm font-inter'>{element.description}</p>
                                        </div>
                                    )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LearningGrid