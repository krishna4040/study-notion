import React from 'react'
import RenderSteps from '@/components/core/Dashboard/AddCourse/RenderSteps'

const AddCourse = () => {
    return (
        <div className='relative gap-5 text-white lg:flex'>
            <div className='w-full lg:w-3/4'>
                <h1 className='text-[#F1F2FF] text-3xl font-medium font-inter'>Add Course</h1>
                <div className='mt-7'><RenderSteps /></div>
            </div>
            <div className='flex-col gap-2 p-6 border rounded-lg bg-[#161D29] border-[#2C333F] fixed top-20 right-10 w-[450px] hidden lg:flex'>
                <p className='text-[#F1F2FF] text-lg font-inter font-semibold'>⚡Course Upload Tips</p>
                <ul className='list-disc space-y-[10px]'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    )
}

export default AddCourse 