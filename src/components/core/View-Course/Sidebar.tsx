'use client'
import { useAppSelector } from '@/lib/hooks';
import { section, subSection } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Sidebar = ({ sectionId, subSectionId, setReviewModal }: { sectionId: string, subSectionId: string, setReviewModal: React.Dispatch<React.SetStateAction<boolean | null>> }) => {

    const [activeSection, setActiveSection] = useState<section | null>(null);
    const [activeSubSection, setActiveSubSection] = useState<subSection | null>(null);
    const router = useRouter();

    const { completedLectures, courseEntireData, courseSectionData, totalNoOfLectures } = useAppSelector(state => state.viewCourse);

    const setActiveFlags = () => {
        if (!courseSectionData.length) {
            return;
        }
        const selectedSectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
        const selectedSubSectionIndex = courseSectionData[selectedSectionIndex].subSection.findIndex(data => data._id === subSectionId);

        setActiveSection(courseSectionData[selectedSectionIndex]);
        setActiveSubSection(courseSectionData[selectedSubSectionIndex].subSection[selectedSubSectionIndex]);
    }

    useEffect(() => {
        setActiveFlags();
    }, [courseSectionData, courseEntireData]);

    return (
        <div>
            <div>
                <div>
                    <button onClick={() => { router.push('/dashboard/enrolled-courses') }}>Back</button>
                    <button onClick={() => { setReviewModal(true) }}>Add Review</button>
                </div>
                <div>
                    <h2>{courseEntireData?.courseName}</h2>
                    <p>{completedLectures.length}</p>
                </div>
                <div>
                    {
                        courseSectionData.map((sec, idx) => {
                            return (
                                <div onClick={() => { setActiveSection(sec) }} key={idx}>
                                    <div>
                                        <p>{sec.sectionName}</p>
                                        <i></i>
                                    </div>
                                    {
                                        activeSection === sec &&
                                        <div>
                                            {
                                                sec.subSection.map((sub, idx) => {
                                                    return (
                                                        <div key={idx} className={`${activeSubSection === sub ? 'bg-yellow-200 text-richblack-900' : 'bg-richblack-900 text-white'}`} onClick={() => {
                                                            router.push(`/view-course/${courseEntireData?._id}/section/${sec._id}/subSection/${sub._id}`);
                                                        }}>
                                                            <input type="checkbox" checked={completedLectures.includes(sub)} onChange={() => { }} />
                                                            <span>{sub.title}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar