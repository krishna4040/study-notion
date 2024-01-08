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
    const dispacth = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);
    const { course } = useAppSelector(state => state.course);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, [])

    const sumbitHandler = async (data: any) => {
        if ((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            // no update
            dispacth(resetCourseState());
            router.push('/dashboard/my-courses');
            return;
        }
        const formdata = new FormData();
        formdata.append("courseId", course?._id!);
        formdata.append("status", getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT);
        setLoading(true);
        const res = await editCourseDetails(formdata, token!);
        if (res) {
            dispacth(resetCourseState());
            router.push('/dashboard/my-courses');
        }
        setLoading(false);
    }

    return (
        <div>
            <h2>Publish Course</h2>
            <form onSubmit={handleSubmit(sumbitHandler)}>
                <label htmlFor="">
                    <input type="checkbox" {...register("public")} />
                    <span>Make this course as public</span>
                </label>
                <div>
                    <button disabled={loading} type='button' onClick={() => { dispacth(setStep(2)) }}>Back</button>
                    <button disabled={loading}>Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default PublishCourse