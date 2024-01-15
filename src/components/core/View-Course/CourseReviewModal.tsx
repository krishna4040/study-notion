'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-rating-stars-component'
import { RxCross2 } from "react-icons/rx"
import { createRating } from '@/services/opr/course'

const CourseReviewModal = ({ setReviewModal }: { setReviewModal: React.Dispatch<React.SetStateAction<boolean>> }) => {

    type formValues = {
        courseExperience: string;
        courseRating: number;
    }

    const { user } = useAppSelector(state => state.profile);
    const { courseEntireData } = useAppSelector(state => state.viewCourse);
    const { token } = useAppSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<formValues>();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    const ratingHandler = (newRating: number) => {
        setValue("courseRating", newRating)
    }

    const submitHandler = async (data: formValues) => {
        await createRating({
            courseId: courseEntireData?._id,
            rating: data.courseRating,
            review: data.courseRating
        }, token!);
        setReviewModal(false);
    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">Add Review</p>
                    <button onClick={() => { setReviewModal(false) }}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-center gap-x-4">
                        <Image src={user?.image!} alt='user-image' width={50} height={50} className="aspect-square rounded-full object-cover" />
                    </div>
                    <div>
                        <p className="font-semibold text-richblack-5">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-richblack-5">Posting Publicly</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(submitHandler)} className="mt-6 flex flex-col items-center">
                    <ReactStars count={5} onChange={ratingHandler} size={24} />
                    <div className="flex w-11/12 flex-col space-y-2">
                        <label htmlFor="experience" className="text-sm text-richblack-5">Add your experience</label>
                        <textarea className="form-style resize-x-none min-h-[130px] w-full" {...register("courseExperience", { required: true })} placeholder='Add Your Experience Here' cols={30} rows={10}></textarea>
                        {errors.courseExperience && <span>Please add your experience</span>}
                    </div>
                    <div>
                        <button className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>Cancel</button>
                        <button className={`flex items-center border border-yellow-50 bg-transparent bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900`}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseReviewModal