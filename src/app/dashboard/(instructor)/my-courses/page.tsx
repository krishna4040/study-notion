'use client'
import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useAppSelector } from '@/lib/hooks'
import { deleteCourse, fetchInstructorCourses } from '@/services/opr/course'
import { RiDeleteBin6Line, RiPencilFill } from 'react-icons/ri'
import { useRouter } from 'next/navigation';
import { course } from '@/lib/types'
import Image from 'next/image'
import { Table, Tbody, Thead, Th, Tr, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal, { modalData } from '@/components/common/Modal'

const MyCourse = () => {

    const { token } = useAppSelector(state => state.auth);
    const [myCourses, setMycourses] = useState<Array<course>>([]);
    const [confirmationModalData, setConfirmationModalData] = useState<modalData | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const getMyCourses = async () => {
        try {
            const response = await fetchInstructorCourses(token!);
            setMycourses(response);
        } catch (error) {
            console.log("unable to fecth instructor courses");
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
                    <Table className='w-full border rounded-lg border-[#2C333F] lg:w-[900px] mx-auto mt-10'>
                        <Thead>
                            <Th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Courses</Th>
                            <Th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Duration</Th>
                            <Th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Price</Th>
                            <Th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Actions</Th>
                        </Thead>
                        <Tbody>
                            {
                                myCourses.map((course, index) => {
                                    return (
                                        <Tr key={index}>

                                            <Td>
                                                <div className='flex gap-5 p-4'>
                                                    <Image src={course.thumbnail} alt="#" height={52} width={52} className='rounded-lg' />
                                                    <div>
                                                        <p className='font-medium font-inter text-[#F1F2FF]'>{course.courseName}</p>
                                                        <p className='font-inter text-[#838894]'>{course.courseDescription}</p>
                                                        <p>Created: </p>
                                                        <p className='uppercase'>{course.status}</p>
                                                    </div>
                                                </div>
                                            </Td>

                                            <Td>
                                                <p className='text-[#838894] p-4'>{course.totalDuration || "2hrs 30min"}</p>
                                            </Td>

                                            <Td>
                                                <p className='text-[#838894] p-4'>{course.price}</p>
                                            </Td>

                                            <Td>
                                                <div className='flex items-center justify-center gap-1'>
                                                    <button onClick={() => { }}><RiPencilFill className='text-lg text-[#6E727F]' /></button>
                                                    <button onClick={() => {
                                                        setConfirmationModalData({
                                                            text1: "Do you want to delete this course",
                                                            text2: "All the data related to this course will be deleted",
                                                            btn1Text: 'Delete',
                                                            btn2Text: 'Cancel',
                                                            btn1Handler: () => { handleCourseDelete(course._id) },
                                                            btn2Handler: () => { setConfirmationModalData(null) },
                                                        })
                                                    }}><RiDeleteBin6Line className='text-lg text-[#6E727F]' /></button>
                                                </div>
                                            </Td>

                                        </Tr>
                                    )
                                })
                            }
                        </Tbody>
                    </Table>
            }
            {confirmationModalData && <Modal modalData={confirmationModalData} />}
        </div>
    )
}

export default MyCourse