'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { subSection } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

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
        const activeSubSec = activeSec[0]?.subSection.filter(sub => sub._id === subSectionId);
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
            console.log(selectedSectionIndex);
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
                    <Player ref={ref} aspectRatio="auto" playsInline onEnded={() => setVideoDataEnded(true)} src={videoData?.videoUrl}>
                        <BigPlayButton position="center" />
                        {
                            videoDataEnded &&
                            <div
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                }}
                                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                                {
                                    !completedLectures.includes(videoData) &&
                                    <button>{!loading ? "Mark as completed" : "Loading..."}</button>
                                }
                                <button>Re-watch</button>
                                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                    {!isFirstVideo() && <button onClick={gotoPrevVideo} className="blackButton">Prev</button>}
                                    {!isLastVideo() && <button onClick={gotoNextVideo} className="blackButton">Next</button>}
                                </div>
                            </div>
                        }
                    </Player>
                </div>
            }
            <h1 className="mt-4 text-3xl font-semibold text-[#F1F2FF]">{videoData?.title}</h1>
            <p className="pt-2 pb-6 text-[#F1F2FF]">{videoData?.description}</p>
        </div>
    )
}

export default VideoPlayer