'use client'
import React, { useEffect, useRef } from 'react'
import { course } from '@/lib/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper/modules'
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import CourseCard from './CourseCard';

const CourseSlider = ({ courses }: { courses: course[] }) => {

    return (
        <div>
            {
                courses.length &&
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    modules={[FreeMode, Pagination]}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="max-h-[30rem]"
                >
                    {
                        courses.map((course, idx) => {
                            return <SwiperSlide key={idx}><CourseCard course={course} /></SwiperSlide>
                        })
                    }
                </Swiper>
            }
        </div>
    )
}

export default CourseSlider