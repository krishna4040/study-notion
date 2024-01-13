'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { subSection } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { Player } from 'video-react';
import '~video-react/dist/video-react.css';

const VideoPlayer = ({ courseId, sectionId, subSectionId }: { courseId: string; sectionId: string, subSectionId: string }) => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const ref = useRef();
    const { token } = useAppSelector(state => state.auth);
    const { completedLectures, courseEntireData, courseSectionData, totalNoOfLectures } = useAppSelector(state => state.viewCourse);

    const [videoData, setVideoData] = useState<subSection | null>(null);
    const [videoDataEnded, setVideoDataEnded] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const setVideoSpecificDetails = async () => {
        if (!courseId || !sectionId || !subSectionId) {
            router.push('/dashboard/enrolled-courses');
        }
        const activeSec = courseSectionData.filter(sec => sec._id === sectionId);
        const activeSubSec = activeSec[0].subSection.filter(sub => sub._id === subSectionId);
        setVideoData(activeSubSec[0]);
        setVideoDataEnded(false);
    }

    useEffect(() => {
        setVideoSpecificDetails();
    }, [courseEntireData, courseSectionData]);

    const isFirstVideo = (): boolean => {
        const selectedSectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
        const selectedSubSectionIndex = courseSectionData[selectedSectionIndex].subSection.findIndex(data => data._id === subSectionId);
        return (selectedSectionIndex === 0 && selectedSubSectionIndex === 0);
    }
    const isLastVideo = (): boolean => {
        const selectedSectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
        const selectedSubSectionIndex = courseSectionData[selectedSectionIndex].subSection.findIndex(data => data._id === subSectionId);
        const numberOfSubSectionsInSelectedSection = courseSectionData[selectedSectionIndex].subSection.length;
        return (selectedSectionIndex === courseSectionData.length - 1 && selectedSubSectionIndex === numberOfSubSectionsInSelectedSection - 1);
    }
    const gotoNextVideo = () => {
        const selectedSectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
        const selectedSubSectionIndex = courseSectionData[selectedSectionIndex].subSection.findIndex(data => data._id === subSectionId);
        const numberOfSubSectionsInSelectedSection = courseSectionData[selectedSectionIndex].subSection.length;

        if (selectedSubSectionIndex !== numberOfSubSectionsInSelectedSection - 1) {
            const nextSubSectionId = courseSectionData[selectedSectionIndex].subSection[selectedSubSectionIndex + 1]._id;
            router.push(`/view-course/${courseEntireData?._id}/section/${sectionId}/subSection/${nextSubSectionId}`);
        } else {
            const nextSectionId = courseSectionData[selectedSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[selectedSectionIndex + 1].subSection[0]._id;
            router.push(`/view-course/${courseEntireData?._id}/section/${nextSectionId}/subSection/${nextSubSectionId}`);
        }
    }
    const gotoPrevVideo = () => {
        const selectedSectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
        const selectedSubSectionIndex = courseSectionData[selectedSectionIndex].subSection.findIndex(data => data._id === subSectionId);

        if (selectedSectionIndex != 0) {
            const prevSubSectionId = courseSectionData[selectedSectionIndex].subSection[selectedSubSectionIndex - 1]._id;
            router.push(`/view-course/${courseEntireData?._id}/section/${sectionId}/subSection/${prevSubSectionId}`);
        } else {
            const prevSectionId = courseSectionData[selectedSectionIndex - 1]._id;
            const prevSubSectionId = courseSectionData[selectedSectionIndex - 1].subSection[0]._id;
            router.push(`/view-course/${courseEntireData?._id}/section/${prevSectionId}/subSection/${prevSubSectionId}`);
        }
    }

    const handleLectureCompletion = async () => {
        setLoading(true);
    }

    return (
        <div>
            {
                videoData &&
                <div>
                    <Player>
                        <source src={videoData.videoUrl} />
                    </Player>
                </div>
            }
        </div>
    )
}

export default VideoPlayer