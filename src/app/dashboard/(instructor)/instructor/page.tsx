'use client'
import { useAppSelector } from '@/lib/hooks'
import { course } from '@/lib/types';
import { fetchInstructorCourses } from '@/services/opr/course';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import InstructorChart from '@/components/core/Dashboard/InstructorChart';

const InstructorPanel = () => {

    const { user } = useAppSelector(state => state.profile);
    const { token } = useAppSelector(state => state.auth);
    const [courses, setCourses] = useState<course[]>([]);

    const getCourseData = async () => {
        const res = await fetchInstructorCourses(token!);
        setCourses(res);
    }

    useEffect(() => {

    }, []);

    const calculateTotalAmountEarned = (courses: course[]) => { }
    const calculateTotalStudentsEnrolled = (courses: course[]) => { }

    return (
        <div>
            <div>
                <h1>Hi {user?.firstName}</h1>
                <p>Let's start something new</p>
                {
                    courses?.length > 0 &&
                    <div>
                        {/* <InstructorChart /> */}
                        <div>
                            <p>Statics</p>
                            <div>
                                <p>Total Courses</p>
                                <p>{courses.length}</p>
                            </div>
                            <div>
                                <p>Total Students</p>
                                {/* <p>{calculateTotalStudentsEnrolled(courses)}</p> */}
                            </div>
                            <div>
                                <p>Total Income</p>
                                {/* <p>{calculateTotalAmountEarned(courses)}</p> */}
                            </div>
                        </div>
                    </div>
                }
                <div>
                    <div>
                        <p>Your Courses</p>
                        <Link href={'dashboard/my-courses'}><p>View All</p></Link>
                        <div>
                            {
                                courses.slice(0, 3).map(course => {
                                    return (
                                        <div>
                                            <Image src={course.thumbnail} alt='course' />
                                            <div>
                                                <p>{course.courseName}</p>
                                                <div>
                                                    <p>{course.studentsEnrolled.length}</p>
                                                    <p>|</p>
                                                    <p>Rs. {course.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorPanel