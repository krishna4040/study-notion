'use client'
import { resetCourseState, setStep } from '@/lib/feature/courseSlice';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { editCourseDetails } from '@/services/opr/course';
import { COURSE_STATUS } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const PublishCourse = () => {

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);
    const { course } = useAppSelector(state => state.course);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, [])

    const submitHandler = async (data: any) => {
        if ((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            // no update
            dispatch(resetCourseState());
            router.push('/dashboard/my-courses');
            return;
        }
        const formData = new FormData();
        formData.append("courseId", course?._id!);
        formData.append("status", getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT);
        setLoading(true);
        const res = await editCourseDetails(formData, token!);
        if (res) {
            dispatch(resetCourseState());
            router.push('/dashboard/my-courses');
        }
        setLoading(false);
    }

    return (
        <div>
            <div className='p-6 space-y-8 rounded-md border-richblack-700 bg-richblack-800 mt-7'>
                <h2 className='text-richblack-5 font-semibold text-2xl font-inter'>Publish Course</h2>
                <form onSubmit={handleSubmit(submitHandler)} className=''>
                    <label htmlFor="public" className='flex items-center justify-start gap-2 text-richblack-400'>
                        <input type="checkbox" {...register("public")} className='form-style' />
                        <span>Make this course as public</span>
                    </label>
                </form>
            </div>
            <div className='flex items-center justify-end w-full gap-4'>
                <button className='bg-richblack-800 px-6 py-3 rounded-lg flex items-center justify-center mt-6 text-richblack-5' disabled={loading} type='button' onClick={() => { dispatch(setStep(2)) }}>Back</button>
                <button className='bg-[#FFD60A] px-6 py-3 rounded-lg flex items-center justify-center mt-6 text-black' disabled={loading}>Save Changes</button>
            </div>
        </div>
    )
}

export default PublishCourse