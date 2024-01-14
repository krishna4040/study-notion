import React from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { buyCourse } from '@/services/opr/payment'

const RenderTotalAmount = () => {

    const { token } = useAppSelector(state => state.auth);
    const { cart, total } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.profile);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        const courses = cart!.map(course => course._id);
        buyCourse(courses, token, user, dispatch, router);
    }

    return (
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {total}</p>
            <button onClick={clickHandler} className={`flex items-center border bg-yellow-50 bg-transparent cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 `}>
                Buy Now
            </button>
        </div>
    )
}

export default RenderTotalAmount