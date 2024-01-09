'use client'
import RenderSteps from '@/components/core/Dashboard/AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '@/lib/feature/courseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchCourseDetails } from '@/services/opr/course';
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { courseId: string } }) => {

    const dispacth = useAppDispatch();

    const { courseId } = params;
    const { token } = useAppSelector(state => state.auth);
    const [loading, setLoading] = useState(false);

    const populateCourseDetails = async () => {
        setLoading(true);
        const res = await fetchCourseDetails(courseId, token!);
        dispacth(setEditCourse(true));
        dispacth(setCourse(res));
    }

    useEffect(() => {
        populateCourseDetails();
    }, []);

    return (
        <div>
            <h1 className='text-white'>Edit Course</h1>
            {loading ? <RenderSteps /> : <p>Course not found</p>}
        </div>
    )
}

export default page