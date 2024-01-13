'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/lib/hooks'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-rating-stars-component'

const CourseReviewModal = ({ setReviewModal }: { setReviewModal: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const { user } = useAppSelector(state => state.profile);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<{ courseExperience: string, courseRating: number }>();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    const ratingHandler = () => { }

    const submitHandler = async () => { }

    return (
        <div>
            <div>
                <div>
                    <p>Add Review</p>
                    <button onClick={() => { setReviewModal(false) }}>Close</button>
                </div>
                <div>
                    <div>
                        <Image src={user?.image!} alt='user-image' width={50} height={50} />
                    </div>
                    <div>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>Posting Publically</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <ReactStars count={5} onChange={ratingHandler} size={24} />
                    <div>
                        <label htmlFor="experience">Add your experience</label>
                        <textarea {...register("courseExperience", { required: true })} placeholder='Add Your Experience Here' className='w-full form-style' cols={30} rows={10}></textarea>
                        {errors.courseExperience && <span>Please add your experience</span>}
                    </div>
                    <div>
                        <button>Cancel</button>
                        <button>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseReviewModal