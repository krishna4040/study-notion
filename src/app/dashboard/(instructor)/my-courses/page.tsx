'use client'
import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useAppSelector } from '@/lib/hooks'
import { fetchInstructorCourses } from '@/services/opr/course'
import { RiDeleteBin6Line, RiPencilFill } from 'react-icons/ri'
import { useRouter } from 'next/navigation';
import { course } from '@/lib/types'
import Image from 'next/image'

const MyCourse = () => {

    const { token } = useAppSelector(state => state.auth);
    const [myCourses, setMycourses] = useState<Array<course>>([]);
    const router = useRouter();

    const getMyCourses = async () => {
        try {
            const response = await fetchInstructorCourses(token!);
            setMycourses(response);
        } catch (error) {
            console.log("unable to fecth instructor courses");
        }
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
                                                    <Image src={course.thumbnail} alt="#" height={52} width={52} className='rounded-lg' />
                                                    <div>
                                                        <p className='font-medium font-inter text-[#F1F2FF]'>{course.courseName}</p>
                                                        <p className='font-inter text-[#838894]'>{course.courseDescription}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <p className='text-[#838894] p-4'>{course.totalDuration || "2hrs 30min"}</p>
                                            </td>

                                            <td>
                                                <p className='text-[#838894] p-4'>{course.price}</p>
                                            </td>

                                            <td>
                                                <div className='flex items-center justify-center gap-1'>
                                                    <RiPencilFill className='text-lg text-[#6E727F]' />
                                                    <RiDeleteBin6Line className='text-lg text-[#6E727F]' />
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default MyCourse