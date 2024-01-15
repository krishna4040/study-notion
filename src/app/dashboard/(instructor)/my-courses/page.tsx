'use client'
import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useAppSelector } from '@/lib/hooks'
import { deleteCourse, fetchInstructorCourses } from '@/services/opr/course'
import { RiDeleteBin6Line, RiPencilFill } from 'react-icons/ri'
import { useRouter } from 'next/navigation';
import { course } from '@/lib/types'
import Image from 'next/image'
import Modal, { modalData } from '@/components/common/Modal'
import { convertToSeconds } from '@/utils/convetToSeconds'
import { convertSecondsToDuration } from '@/utils/convertToDuration'

const MyCourse = () => {

    const { token } = useAppSelector(state => state.auth);
    const [myCourses, setMyCourses] = useState<Array<course>>([]);
    const [confirmationModalData, setConfirmationModalData] = useState<modalData | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const getMyCourses = async () => {
        try {
            const response = await fetchInstructorCourses(token!);
            setMyCourses(response);
        } catch (error) {
            console.log("unable to fetch instructor courses");
        }
    }

    const handleCourseDelete = async (courseId: string) => {
        setLoading(false);
        await deleteCourse({ courseId }, token!);
        const res = await fetchInstructorCourses(token!);
        // setcourse
    }

    useEffect(() => {
        getMyCourses();
    }, []);

    const convertDateToString = (date: Date) => {
        const str = date.toString().split("T").splice(0, 1).join();
        return str;
    }

    const calculateTimeDuration = (course: course) => {
        let total = 0;
        course.courseContent.forEach(sec => {
            sec.subSection.forEach(sub => {
                total += convertToSeconds(sub.timeDuration);
            });
        });
        return convertSecondsToDuration(total);
    }

    return (
        <div>
            <div className='flex justify-between w-full'>
                <h1 className='text-[#F1F2FF] text-3xl font-medium font-inter'>My Course</h1>
                <button className='flex py-3 px-6 gap-2 rounded-lg items-center justify-center bg-[#FFD60A]' onClick={() => { router.push('/dashboard/add-course') }}>
                    <AiOutlinePlusCircle />
                    <p>New</p>
                </button>
            </div>
            {
                !myCourses.length ? (<div></div>)
                    :
                    <table className='w-full border rounded-lg border-[#2C333F] lg:w-[900px] mx-auto mt-10'>
                        <thead>
                            <th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Courses</th>
                            <th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Duration</th>
                            <th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Price</th>
                            <th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Actions</th>
                        </thead>
                        <tbody>
                            {
                                myCourses.map((course, index) => {
                                    return (
                                        <tr key={index}>

                                            <td>
                                                <div className='flex gap-5 p-4'>
                                                    <Image src={course?.thumbnail} alt="#" width={300} height={10} />
                                                    <div>
                                                        <p className='font-medium font-inter text-[#F1F2FF]'>{course.courseName}</p>
                                                        <p className='font-inter text-[#838894]'>{course.courseDescription}</p>
                                                        <p className='text-richblue-400'>Created: {convertDateToString(course.createdAt)}</p>
                                                        <p className='uppercase text-brown-50'>{course.status}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <p className='text-[#838894] p-4'>{calculateTimeDuration(course)}</p>
                                            </td>

                                            <td>
                                                <p className='text-[#838894] p-4'>{course.price}</p>
                                            </td>

                                            <td>
                                                <div className='flex items-center justify-center gap-1'>
                                                    <button onClick={() => { router.push(`/dashboard/edit-course/${course._id}`) }}><RiPencilFill className='text-2xl text-[#6E727F] hover:text-blue-300 transition-all duration-200' /></button>
                                                    <button onClick={() => {
                                                        setConfirmationModalData({
                                                            text1: "Do you want to delete this course",
                                                            text2: "All the data related to this course will be deleted",
                                                            btn1Text: 'Delete',
                                                            btn2Text: 'Cancel',
                                                            btn1Handler: () => { handleCourseDelete(course._id) },
                                                            btn2Handler: () => { setConfirmationModalData(null) },
                                                        })
                                                    }}><RiDeleteBin6Line className='text-2xl text-[#6E727F] hover:text-[#a83232] transition-all duration-200' /></button>
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
            {confirmationModalData && <Modal modalData={confirmationModalData} />}
        </div>
    )
}

export default MyCourse