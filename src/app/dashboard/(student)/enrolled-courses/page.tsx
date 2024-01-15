'use client'
import React, { useState, useEffect } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { getUserEnrolledCourses } from '@/services/opr/profile'
import ProgressBar from '@ramonak/react-progress-bar';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { course } from '@/lib/types';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { convertToSeconds } from '@/utils/convetToSeconds';
import { convertSecondsToDuration } from '@/utils/convertToDuration';

const EnrolledCourses = () => {

    const { token } = useAppSelector(state => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState<Array<course>>([]);
    const [progress, setProgress] = useState<number>(0);
    const router = useRouter();

    const getEnrolledCourses = async () => {
        try {
            const res = await getUserEnrolledCourses(token!);
            setEnrolledCourses(res.enrolledCourses);
            setProgress(res.progressPercentage);
        } catch (error) {
            console.log("could not fetch enrolled courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

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

    return (
        <div>
            <h1 className='text-[#F1F2FF] text-3xl font-medium font-inter'>Enrolled Courses</h1>
            {
                !enrolledCourses.length ? (<div></div>)
                    :
                    <table className='w-full border rounded-lg border-[#2C333F] lg:w-[900px] mx-auto mt-10'>
                        <thead>
                            <th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Course Name</th>
                            <th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Duration</th>
                            <th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'>Progress</th>
                            <th className='p-4 border-b bg-[#2C333F] border-[#2C333F] text-[#C5C7D4] text-left'></th>
                        </thead>
                        <tbody>
                            {
                                enrolledCourses.map((course, index) => {
                                    return (
                                        <tr key={index}>

                                            <td>
                                                <div className='flex gap-5 p-4' onClick={() => {
                                                    router.push(`/view-course/${course._id}/section/${course.courseContent[0]._id}/subSection/${course.courseContent[0].subSection[0]._id}`);
                                                }}>
                                                    {/* Todo */}
                                                    <Image src={course.thumbnail} alt="#" height={52} width={52} className='rounded-lg' />
                                                    <div>
                                                        <p className='font-medium font-inter text-[#F1F2FF]'>{course.courseName}</p>
                                                        <p className='font-inter text-[#838894]'>{course.courseDescription}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <p className='text-[#838894] p-4'>{calculateTotalDuration(course) || "2hrs 30min"}</p>
                                            </td>

                                            <td>
                                                <div className='flex flex-col gap-1 p-4'>
                                                    <p className='text-[#838894]'>Progress: {progress || 40}%</p>
                                                    <ProgressBar completed={progress || 40} height='8px' isLabelVisible={false} />
                                                </div>
                                            </td>

                                            <td><BsThreeDotsVertical className='text-lg text-[#999DAA]' /></td>

                                        </tr>)
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default EnrolledCourses