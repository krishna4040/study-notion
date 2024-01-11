import { course } from '@/lib/types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RatingStars from '@/components/common/RatindStars'
import GetAvgRating from '@/utils/avgRatnig'


const CourseCard = async ({ course }: { course: course }) => {

    const avgReviewCount = GetAvgRating(course.ratingAndReviews);

    return (
        <>
            <Link href={`courses/${course._id}`}>
                <div>
                    <div className="rounded-lg">
                        <Image src={course.thumbnail} alt='Course' className={`w-full rounded-xl object-cover`} height={250} />
                    </div>
                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-xl text-richblack-5">{course.courseName}</p>
                        <p className="text-sm text-richblack-50">{course.instructor.firstName} {course.instructor.lastName}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-5">{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                            <span className="text-richblack-400">{course.ratingAndReviews.length} Ratings</span>
                        </div>
                        <p className="text-xl text-richblack-5">{course.price}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CourseCard