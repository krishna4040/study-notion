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
        getCourseData();
    }, []);

    const calculateTotalStudentsEnrolled = (courses: course[]) => {
        let total = 0;
        courses.forEach(course => {
            total += course.studentsEnrolled.length;
        });
        return total;
    }
    const calculateTotalAmountEarned = (courses: course[]) => {
        let total = 0;
        courses.forEach(course => {
            total += course.studentsEnrolled.length * course.price;
        });
        return total;
    }

    return (
        <div>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-richblack-5">Hi {user?.firstName} 👋</h1>
                <p className="font-medium text-richblack-200">Let's start something new</p>
                {
                    courses?.length > 0 ?
                        <div>
                            <InstructorChart courses={courses} />
                            <div className="my-4 flex h-[450px] space-x-4">
                                <p className="text-lg font-bold text-richblack-5">Statics</p>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <p className="text-lg text-richblack-200">Total Courses</p>
                                        <p className="text-3xl font-semibold text-richblack-50">{courses.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg text-richblack-200">Total Students</p>
                                        <p className="text-3xl font-semibold text-richblack-50">{calculateTotalStudentsEnrolled(courses)}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg text-richblack-200">Total Income</p>
                                        <p className="text-3xl font-semibold text-richblack-50">{calculateTotalAmountEarned(courses)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-md bg-richblack-800 p-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                                    <Link href={'dashboard/my-courses'}><p className="text-xs font-semibold text-yellow-50">View All</p></Link>
                                    <div className="my-4 flex items-start space-x-6">
                                        {
                                            courses.slice(0, 3).map(course => {
                                                return (
                                                    <div className="w-1/3" key={course._id}>
                                                        <Image src={course.thumbnail} alt='course' height={201} width={200} className="h-[201px] w-full rounded-md object-cover" />
                                                        <div className="mt-3 w-full">
                                                            <p className="text-sm font-medium text-richblack-50">{course.courseName}</p>
                                                            <div className="mt-1 flex items-center space-x-2">
                                                                <p className="text-xs font-medium text-richblack-300">{course.studentsEnrolled.length}</p>
                                                                <p className="text-xs font-medium text-richblack-300">|</p>
                                                                <p className="text-xs font-medium text-richblack-300">Rs. {course.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
                            <p className="text-center text-2xl font-bold text-richblack-5">You have not created any courses yet</p>
                            <Link href="/dashboard/add-course"><p className="mt-1 text-center text-lg font-semibold text-yellow-50">Create a course</p></Link>
                        </div>
                }
            </div>
        </div>
    )
}

export default InstructorPanel