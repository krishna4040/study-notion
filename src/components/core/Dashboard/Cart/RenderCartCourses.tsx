'use client'
import React from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import ReactStars from 'react-rating-stars-component'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from '@/lib/feature/cartSlice'
import Image from 'next/image'

const RenderCartCourses = () => {

    const { cart, total } = useAppSelector(state => state.cart);
    const dispacth = useAppDispatch();

    const clickHandler = () => {
        const courses = cart!.map(course => course._id);
        // payment remaining
    }

    return (
        <div>
            {
                cart!.map((course, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <Image src={course.thumbnail} alt="course_thumbnail" />
                                <div>
                                    <p>{course.courseName}</p>
                                    <p>{course.category.name}</p>
                                    <div>
                                        <span>4.5</span>
                                        <ReactStars count={5} size={20} edit={false} activeColor={'#ffd700'} emptyIcon={<AiOutlineStar />} filledIcon={<AiFillStar />} />
                                        <span>{course.ratingAndReviews.length} Ratings</span>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => { dispacth(removeFromCart(course._id)) }}>
                                        <RiDeleteBin6Line />
                                        <span>Remove</span>
                                    </button>
                                    <p>{course.price}</p>
                                </div>
                            </div>

                            <div>
                                <p>Total:</p>
                                <p>Rs {total}</p>
                                <button onClick={clickHandler}>Buy Now</button>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default RenderCartCourses