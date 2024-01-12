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
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, You cannot buy the course");
        }
        if (token) {
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
        <div>
            <Image src={course.thumbnail} alt='Course' height={250} width={250} />
            <p>Rs. {course.price}</p>
            <div>
                <button onClick={() => {
                    course.studentsEnrolled.includes(user!) ?
                        router.push('dashboard/enrolled-courses') :
                        handleBuyCourse();
                }}>
                    {course.studentsEnrolled.includes(user!) ? "Go To Course" : "Buy Now"}
                </button>
                {
                    !course.studentsEnrolled.includes(user!) &&
                    <button onClick={handleAddToCart}>Add To Cart</button>
                }
            </div>
            <div>
                <p>30 Day money back guarantee</p>
                <p>This Course Includes:</p>
                <div>
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
            <button onClick={handleShare}>Share</button>
        </div>
    )
}

export default CourseDetailsCard