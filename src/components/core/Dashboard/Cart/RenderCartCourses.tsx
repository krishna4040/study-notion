'use client'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import ReactStars from 'react-rating-stars-component'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart, setCart } from '@/lib/feature/cartSlice'
import Image from 'next/image'

const RenderCartCourses = () => {

    const { cart } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!cart.length) {
            dispatch(setCart(user?.cart!));
        }
    }, []);



    return (
        <div className='flex flex-1 flex-col'>
            {
                cart?.length && cart!.map((course, idx) => {
                    return (
                        <div key={idx} className={`flex w-full flex-wrap items-start justify-between gap-6 ${idx !== cart?.length! - 1 && "border-b border-b-richblack-400 pb-6"} ${idx !== 0 && "mt-6"} `}>
                            <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
                                <Image src={course.thumbnail} alt="course_thumbnail" height={148} width={220} className="h-[148px] w-[220px] rounded-lg object-cover" />
                                <div className='flex flex-col space-y-1'>
                                    <p className='text-lg font-medium text-richblack-5'>{course.courseName}</p>
                                    <p className="text-sm text-richblack-300">{course.category.name}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-5">4.5</span>
                                        <ReactStars count={5} size={20} edit={false} activeColor={'#ffd700'} emptyIcon={<AiOutlineStar />} filledIcon={<AiFillStar />} />
                                        <span className="text-richblack-400">{course.ratingAndReviews.length} Ratings</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                    <button onClick={() => { dispatch(removeFromCart(course._id)) }} className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200">
                                        <RiDeleteBin6Line />
                                        <span>Remove</span>
                                    </button>
                                    <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {course.price}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RenderCartCourses