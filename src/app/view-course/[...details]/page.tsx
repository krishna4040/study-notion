import { setCompletedLectures, setCourseSectionData, setEntireCourseData } from '@/lib/feature/viewCourseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchCourseDetails } from '@/services/opr/course';
import React, { useState } from 'react'

const page = ({ params }: { params: { details: string[] } }) => {

    const { details } = params;
    let courseId: string | null = null;
    let sectionId = null;
    let subsectionId = null;
    for (let i = 0; i < details.length; i += 2) {
        const key = details[i];
        const value = details[i + 1];
        if (key === 'courseId') {
            courseId = value;
        } else if (key === 'sectionId') {
            sectionId = value;
        } else if (key === 'subSectionId') {
            subsectionId = value;
        }
    }

    const [reviewModal, setReviewModal] = useState(null);
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const setCourseDetails = async () => {
        const courseData = await fetchCourseDetails(courseId!, token!);
        dispatch(setCourseSectionData(courseData.courseContent));
        dispatch(setEntireCourseData(courseData));
    }

    return (
        <div>
            {/* <Sidebar setReviewModal={setReviewModal} sectionId={sectionId} subSectionId={subSectionId} />  */}
            <div>
                {/* <VideoPlayer /> */}
            </div>
            {/* {reviewModal && <ReviewModal setReviewModal={setReviewModal} />} */}
        </div>
    )
}

export default page