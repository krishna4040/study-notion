'use client'
import React from 'react'
import { useAppSelector } from '@/lib/hooks';
import { FaCheck } from 'react-icons/fa'
import CourseInformationForm from './CourseInformationForm'

const RenderSteps = () => {

    const { step } = useAppSelector(state => state.course);
    const steps = [
        { id: 1, title: "Course Info" },
        { id: 2, title: "Course Builder" },
        { id: 3, title: "Publish" }
    ];

    return (
        <div className=''>
            <div className='flex items-center justify-center'>
                {
                    steps.map((element, index) => {
                        return (
                            <div key={element.id} className='flex'>
                                <div className='flex flex-col items-center justify-between gap-2'>
                                    <div className={`${step === element.id ? 'bg-yellow-900 border border-yellow-50 text-yellow-50' : 'border-richblack-700 bg-richblack-800 text-richblack-300'} rounded-full h-[34px] w-[34px] flex items-center justify-center`}>
                                        {step > element.id ? <FaCheck /> : element.id}
                                    </div>
                                    <p className={`text-sm font-inter ${step === element.id ? 'text-[#F1F2FF]' : 'text-[#585D69]'}`}>
                                        {element.title}
                                    </p>
                                </div>
                                {(index <= 1) && <span className=''>------&gt;</span>}
                            </div>
                        )
                    })
                }
            </div>

            {step === 1 && <CourseInformationForm />}
            {/* {step === 2 && <CourseBuilderForm/>} */}
            {/* {step === 3 && <PublishForm/>} */}

        </div>
    )
}

export default RenderSteps