'use client'
import { setCourseSectionData, setEntireCourseData } from '@/lib/feature/viewCourseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchCourseDetails } from '@/services/opr/course';
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/core/View-Course/Sidebar';
import VideoPlayer from '@/components/core/View-Course/VideoPlayer';

const page = ({ params }: { params: { details: string[] } }) => {

    const { details } = params;
    const courseId = details[0], sectionId = details[2], subSectionId = details[4];

    const [reviewModal, setReviewModal] = useState<boolean | null>(null);
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const setCourseDetails = async () => {
        const courseData = await fetchCourseDetails(courseId!, token!);
        dispatch(setCourseSectionData(courseData.courseContent));
        dispatch(setEntireCourseData(courseData));
    }

    useEffect(() => {
        setCourseDetails();
    }, []);

    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)] gap-4">
            <Sidebar setReviewModal={setReviewModal} sectionId={sectionId} subSectionId={subSectionId} />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto mx-6">
                <VideoPlayer courseId={courseId} sectionId={sectionId} subSectionId={subSectionId} />
            </div>
            {/* {reviewModal && <ReviewModal setReviewModal={setReviewModal} />} */}
        </div>
    )
}

export default page