'use client'
import React from 'react'
import { useAppSelector } from '@/lib/hooks'
import RenderCartCourses from '@/components/core/Dashboard/Cart/RenderCartCourses'

const Cart = () => {

    const { total, totalItems } = useAppSelector(state => state.cart);

    return (
        <div>

            <h1>Uour Cart</h1>
            <p>{totalItems} Courses in Cart</p>

            {
                total < 0 ?
                    <p>Your Cart is Empty</p> :
                    <div>
                        <RenderCartCourses />
                    </div>
            }

        </div>
    )
}

export default Cart