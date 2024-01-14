'use client'
import { modalData } from '@/components/common/Modal';
import { course } from '@/lib/types'
import React from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '@/utils/constants';
import { addToCart } from '@/lib/feature/cartSlice';

type props = {
    course: course;
    setConfirmationModal: React.Dispatch<React.SetStateAction<modalData | null>>;
    handleBuyCourse: () => void;
}

const CourseDetailsCard: React.FunctionComponent<props> = ({ course, setConfirmationModal, handleBuyCourse }) => {

    const { user } = useAppSelector(state => state.profile);
    const { token } = useAppSelector(state => state.auth);
    const { cart } = useAppSelector(state => state.cart);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, You cannot buy the course");
        }
        if (token) {
            // todo: backend pr integrate
            dispatch(addToCart(course));
            toast.success("Course Added to Cart");
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please Login to add to cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => router.push("/login"),
            btn2Handler: () => { setConfirmationModal(null) }
        })
    }

    const handleShare = () => {
        copy(window.location.href, {
            debug: true,
            message: 'Press #{key} to copy',
        });
        toast.success("Link copied to clipboard");
    }

    return (
        <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
            <Image src={course.thumbnail} alt='Course' height={180} width={400} />
            <p className='space-x-3 pb-4 text-3xl font-semibold'>Rs. {course.price}</p>
            <div className="flex flex-col gap-4">
                <button onClick={() => {
                    course.studentsEnrolled.includes(user!) ?
                        router.push('dashboard/enrolled-courses') :
                        handleBuyCourse();
                }} className="yellowButton">
                    {course.studentsEnrolled.includes(user!) ? "Go To Course" : "Buy Now"}
                </button>
                {
                    !course.studentsEnrolled.includes(user!) && !cart?.includes(course) &&
                    <button onClick={handleAddToCart} className="blackButton">Add To Cart</button>
                }
                {
                    cart?.includes(course) &&
                    <button onClick={() => { router.push('/dashboard/cart') }} className="blackButton">Go To Cart</button>
                }
            </div>
            <div>
                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30 Day money back guarantee</p>
                <p className={`my-2 text-xl font-semibold `}>This Course Includes:</p>
                <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                    {
                        course.instructions.map((ins, idx) => {
                            return (
                                <p key={idx}>
                                    <span>{ins}</span>
                                </p>
                            )
                        })
                    }
                </div>
            </div>
            <button className="mx-auto flex items-center gap-2 py-6 text-yellow-100 text-center" onClick={handleShare}>Share</button>
        </div>
    )
}

export default CourseDetailsCard