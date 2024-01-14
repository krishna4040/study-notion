'use client'
import React from 'react'
import { useAppSelector } from '@/lib/hooks'
import RenderCartCourses from '@/components/core/Dashboard/Cart/RenderCartCourses'
import RenderTotalAmount from '@/components/core/Dashboard/Cart/RenderTotalAmount'

const Cart = () => {

    const { total, totalItems } = useAppSelector(state => state.cart);

    return (
        <div>

            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in Cart</p>

            {
                total < 0 ?
                    <p className="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty</p> :
                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
            }

        </div>
    )
}

export default Cart