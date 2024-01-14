'use client'
import { useAppSelector } from '@/lib/hooks';
import { section, subSection } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io"
import { BsChevronDown } from "react-icons/bs"

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
        <div className="h-[calc(100vh-3.5rem)] border-r flex items-start w-[300px] border-r-richblack-700 bg-richblack-800">
            <div className="flex w-full flex-col items-start justify-between gap-2 gap-y-4 py-5 text-lg font-bold text-richblack-25">
                <div className="flex w-full px-4 items-center justify-between ">
                    <button className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90" onClick={() => { router.push('/dashboard/enrolled-courses') }}><IoIosArrowBack size={30} /></button>
                    <button className={`flex items-center "border border-yellow-50 bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900`} onClick={() => { setReviewModal(true) }}>Add Review</button>
                </div>
                <div className="flex mx-auto w-[280px] items-center justify-between py-2 px-6 border-b border-richblack-600">
                    <h2 className='font-inter font-semibold text-[#DBDDEA]'>
                        {courseEntireData?.courseName}
                        <span className='text-sm text-[#06D6A0] font-semibold'> {completedLectures.length}/{totalNoOfLectures}</span>
                    </h2>
                </div>
                <div className="h-[calc(100vh - 5rem)] overflow-y-auto w-full">
                    {
                        courseSectionData.map((sec, idx) => {
                            return (
                                <div onClick={() => { setActiveSection(sec) }} key={idx} className="mt-2 cursor-pointer text-sm text-richblack-5 w-full">
                                    <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4 w-full">
                                        <p className="w-[70%] font-semibold">{sec.sectionName}</p>
                                        {/* <span className={`${activeStatus === course?.sectionName? "rotate-0": "rotate-180"} transition-all duration-500`}><BsChevronDown /></span> */}
                                    </div>
                                    {
                                        activeSection === sec &&
                                        <div className="transition-[height] duration-500 ease-in-out">
                                            {
                                                sec.subSection.map((sub, idx) => {
                                                    return (
                                                        <div key={idx} className={`${activeSubSection === sub ? 'bg-yellow-200 text-richblack-900' : 'bg-richblack-900 text-white'} py-4 px-6 flex items-center gap-2`} onClick={() => {
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