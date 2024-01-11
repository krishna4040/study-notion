import { course } from '@/lib/types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RatingStars from '@/components/common/RatindStars'
import GetAvgRating from '@/utils/avgRatnig'


const CourseCard = async ({ course }: { course: course }) => {

    const avgReviewCount = GetAvgRating(course.ratingAndReviews);

    return (
        <div>
            <Link href={`courses/${course._id}`}>
                <div>
                    <div>
                        <Image src={course.thumbnail} alt='Course' />
                    </div>
                    <div>
                        <p>{course.courseName}</p>
                        <p>{course.instructor.firstName} {course.instructor.lastName}</p>
                        <div>
                            <span>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                            <span>{course.ratingAndReviews.length} Ratings</span>
                        </div>
                        <p>{course.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard