'use client'
import { setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '@/lib/feature/viewCourseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchCourseDetails } from '@/services/opr/course';
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/core/View-Course/Sidebar';
import VideoPlayer from '@/components/core/View-Course/VideoPlayer';
import { section } from '@/lib/types';
import CourseReviewModal from '@/components/core/View-Course/CourseReviewModal';

const page = ({ params }: { params: { details: string[] } }) => {

    const { details } = params;
    const courseId = details[0], sectionId = details[2], subSectionId = details[4];

    const [reviewModal, setReviewModal] = useState<boolean>(false);
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const setCourseDetails = async () => {
        const courseData = await fetchCourseDetails(courseId!, token!);
        dispatch(setCourseSectionData(courseData.courseContent));
        dispatch(setEntireCourseData(courseData));
        let lectures = 0;
        courseData?.courseContent?.forEach((sec: section) => {
            lectures += sec.subSection.length;
        });
        dispatch(setTotalNoOfLectures(lectures));
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
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </div>
    )
}

export default page