'use client'
import RenderSteps from '@/components/core/Dashboard/AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '@/lib/feature/courseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { getFullDetailsOfCourse } from '@/services/opr/course';
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { courseId: string } }) => {

    const dispacth = useAppDispatch();

    const { courseId } = params;
    const { course } = useAppSelector(state => state.course);
    const { token } = useAppSelector(state => state.auth);
    const [loading, setLoading] = useState(false);

    const populateCourseDetails = async () => {
        setLoading(true);
        // give a check
        const res = await getFullDetailsOfCourse(courseId, token!);
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