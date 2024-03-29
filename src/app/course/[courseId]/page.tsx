'use client'
import { modalData } from '@/components/common/Modal';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { course, section } from '@/lib/types';
import { fetchCourseDetails } from '@/services/opr/course';
import { buyCourse } from '@/services/opr/payment';
import GetAvgRating from '@/utils/avgRatnig';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import RatingStars from '@/components/common/RatindStars'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import Modal from '@/components/common/Modal'
import Footer from '@/components/common/Footer'
import CourseDetailsCars from '@/components/core/Course/CourseDetailsCard';
import Image from 'next/image'
import Markdown from 'react-markdown'
import { convertToSeconds } from '@/utils/convetToSeconds';
import { convertSecondsToDuration } from '@/utils/convertToDuration';
import CourseAccordianBar from '@/components/core/Course/CourseAccordianBar';

const page = ({ params }: { params: { courseId: string } }) => {

    const { courseId } = params;
    const { user, loading } = useAppSelector(state => state.profile);
    const { token } = useAppSelector(state => state.auth);
    const { paymentLoading } = useAppSelector(state => state.course);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [course, setCourse] = useState<course | null>(null);
    const [confirmationModal, setConfirmationModal] = useState<modalData | null>(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [isActive, setIsActive] = useState<string[]>([]);

    const fetchCourse = async () => {
        const res = await fetchCourseDetails(courseId, token!);
        setCourse(res);
    }

    useEffect(() => {
        fetchCourse();
    }, []);

    const handleBuyCourse = () => {
        if (token) {
            buyCourse([courseId], token, user!, dispatch, router);
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => router.push("/login"),
            btn2Handler: () => setConfirmationModal(null)
        });
    }

    if (paymentLoading) {
        return <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center"><div className="spinner"></div></div>
    }

    const calculateTotalLectures = (sections: section[]): number => {
        let totalLect = 0;
        sections.forEach(sec => {
            totalLect += sec.subSection.length;
        });
        return totalLect;
    }

    const calculateTotalDuration = (course: course): string => {
        let totalDurationInSeconds: string | number = 0;
        course.courseContent.forEach(content => {
            content.subSection.forEach((subSection: any) => {
                if (typeof totalDurationInSeconds === 'number') {
                    totalDurationInSeconds += convertToSeconds(subSection.timeDuration);
                }
            });
        });
        return convertSecondsToDuration(totalDurationInSeconds);
    }

    const handleActive = (sectionId: string) => {
        setIsActive(
            !isActive.includes(sectionId)
                ? isActive.concat([sectionId])
                : isActive.filter((e) => e != sectionId)
        )
    }

    return (
        course &&
        <>
            <div className={`relative w-full bg-richblack-800`}>
                {/* Hero Section */}
                <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                    <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                        <div className="relative block max-h-[30rem] lg:hidden">
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <Image
                                src={course?.thumbnail!}
                                alt="course thumbnail"
                                height={250}
                                width={250}
                                className="aspect-auto w-full"
                            />
                        </div>
                        <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
                            <div>
                                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                                    {course?.courseName}
                                </p>
                            </div>
                            <p className={`text-richblack-200`}>{course?.courseDescription}</p>
                            <div className="text-md flex flex-wrap items-center gap-2">
                                <span className="text-yellow-25">{avgReviewCount}</span>
                                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                <span>{`(${course?.ratingAndReviews.length} reviews)`}</span>
                                <span>{`${course?.studentsEnrolled.length} students enrolled`}</span>
                            </div>
                            <div>
                                <p className="">
                                    Created By {`${course?.instructor.firstName} ${course?.instructor.lastName}`}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-5 text-lg">
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <BiInfoCircle /> Created at
                                </p>
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <HiOutlineGlobeAlt /> English
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                            <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                                Rs. {course?.price}
                            </p>
                            <button className="yellowButton" onClick={handleBuyCourse}>
                                Buy Now
                            </button>
                            <button className="blackButton">Add to Cart</button>
                        </div>
                    </div>
                    {/* Courses Card */}
                    <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                        <CourseDetailsCars
                            course={course!}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                    {/* What will you learn section */}
                    <div className="my-8 border border-richblack-600 p-8">
                        <p className="text-3xl font-semibold">What you'll learn</p>
                        <div className="mt-5">
                            <Markdown>{course.whatYouWillLearn}</Markdown>
                        </div>
                    </div>

                    {/* Course Content Section */}
                    <div className="max-w-[830px] ">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] font-semibold">Course Content</p>
                            <div className="flex flex-wrap justify-between gap-2">
                                <div className="flex gap-2">
                                    <span>
                                        {course?.courseContent.length} {`section(s)`}
                                    </span>
                                    <span>
                                        {course?.courseContent.length && calculateTotalLectures(course?.courseContent!)} {`lecture(s)`}
                                    </span>
                                    <span>{calculateTotalDuration(course)} total length</span>
                                </div>
                                <div>
                                    <button
                                        className="text-yellow-25"
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse all sections
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course Details Accordion */}
                        <div className="py-4">
                            {
                                course.courseContent?.map((section, index) => {
                                    return (
                                        <CourseAccordianBar section={section} key={index} isActive={isActive} handleActive={handleActive} />
                                    )
                                })
                            }
                        </div>

                        {/* Author Details */}
                        <div className="mb-12 py-4">
                            <p className="text-[28px] font-semibold">Author</p>
                            <div className="flex items-center gap-4 py-4">
                                <Image
                                    height={250}
                                    width={250}
                                    src={course?.instructor.image!}
                                    alt="Author"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <p className="text-lg">{`${course?.instructor.firstName} ${course?.instructor.lastName}`}</p>
                            </div>
                            <p className="text-richblack-50">
                                {course?.instructor?.additionalDetails?.about}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {confirmationModal && <Modal modalData={confirmationModal} />}
        </>
    )
}

export default page