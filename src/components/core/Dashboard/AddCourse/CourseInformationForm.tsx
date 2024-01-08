'use client'
import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '@/services/opr/course'
import { AiOutlineRight } from 'react-icons/ai'
import { StaticImageData } from 'next/image'
import { category } from '@/lib/types'
import { setCourse, setStep } from '@/lib/feature/courseSlice'
import { course } from '../../../../../server/src/models/Course'
import ImageComponent from './ImageComponent'
import toast from 'react-hot-toast'

export interface formValues {
    courseTitle: string;
    courseShortDesc: string;
    coursePrice: number;
    courseCategory: category;
    file_upload: StaticImageData | string;
    courseBenefits: string;
    tags: string[];
}

const CourseInformationForm: React.FunctionComponent = () => {

    const form = useForm<formValues>();
    const dispacth = useAppDispatch();

    const { course, editCourse } = useAppSelector(state => state.course);
    const { token } = useAppSelector(state => state.auth);
    const { register, handleSubmit, setValue, getValues, formState, control, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState<category[]>([]);

    const [requirementList, setRequirementList] = useState<string[]>([]);
    const [req, setReq] = useState<string>('');

    const getCategories = async () => {
        try {
            setLoading(true);
            const categories = await fetchCourseCategories();
            setCourseCategories(categories);
            if (editCourse) {
                setValue("courseTitle", course?.courseName!);
                setValue("courseShortDesc", course?.courseDescription!);
                setValue("coursePrice", course?.price!);
                setValue("courseBenefits", course?.whatYouWillLearn!);
                setValue("courseCategory", course?.category!);
                setValue("file_upload", course?.thumbnail!);
            }
            setLoading(false);
        } catch (error) {
            console.log("could not fecth categories");
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const isFormUpdated = () => {
        const { courseBenefits, courseCategory, coursePrice, courseShortDesc, courseTitle, file_upload, tags } = getValues();
        return courseBenefits === course?.whatYouWillLearn || courseCategory === course?.category || coursePrice === course?.price || courseShortDesc === course?.courseDescription || courseTitle === course?.courseName || file_upload == course?.thumbnail || requirementList === course?.instructions;
    }

    const submitHandler = async (data: formValues) => {
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course?._id!)
                if (currentValues.courseTitle !== course?.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course?.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course?.price) {
                    formData.append("price", data.coursePrice.toString())
                }
                if (currentValues.tags.toString() !== course?.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.tags))
                }
                if (currentValues.courseBenefits !== course?.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course?.category._id) {
                    formData.append("category", data.courseCategory.name);
                }
                if (requirementList.toString() !== course?.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(requirementList))
                }
                if (currentValues.file_upload !== course?.thumbnail) {
                    formData.append("thumbnailImage", data.file_upload.toString());
                }
                setLoading(true);
                const result = await editCourseDetails(formData, token!);
                setLoading(false);
                if (result) {
                    dispacth(setStep(2));
                    dispacth(setCourse(result));
                }
            } else {
                toast.error("No changes made to the form");
            }
            return;
        } else {
            const formdata = new FormData();
            formdata.append("courseName", data.courseTitle);
            formdata.append("courseDescription", data.courseShortDesc);
            formdata.append("price", data.coursePrice.toString());
            formdata.append("tags", data.tags.toString());
            formdata.append("instructions", requirementList.toString());
            formdata.append("courseImage", data.file_upload.toString());
            formdata.append("whatWillYouLearn", data.courseBenefits);
            formdata.append("courseCategory", data.courseCategory.name);
            setLoading(true);
            const res = await addCourseDetails(formdata, token!);
            setLoading(false);
        }
    }

    return (
        <div className='mt-7'>
            <form onSubmit={handleSubmit(submitHandler)} id='form' className='p-6 space-y-8 rounded-md border-richblack-700 bg-richblack-800'>

                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="courseTitle" className='font-inter texxt-[#F1F2FF]'>Course Title<sup className='text-[#EF476F]'>*</sup></label>
                    <input
                        type="text"
                        placeholder='Enter Course Title'
                        {...register("courseTitle", { required: true })}
                        className='w-full form-style'
                    />
                    {errors.courseTitle && <span>Course Title is Requiered</span>}
                </div>

                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="courseShortDesc" className='font-inter texxt-[#F1F2FF]'>Course Short Description<sup className='text-[#EF476F]'>*</sup></label>
                    <textarea
                        placeholder='Enter Descriprion'
                        {...register("courseShortDesc", { required: true })}
                        className='w-full form-style'
                        rows={5}
                    >
                    </textarea>
                    {errors.courseShortDesc && <span>Course Description is Requiered</span>}
                </div>

                <div className='relative flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="" className='font-inter texxt-[#F1F2FF]'>Course Price<sup className='text-[#EF476F]'>*</sup></label>
                    <input
                        type="text"
                        placeholder={`Enter Course Price`}
                        {...register("coursePrice", { required: true, valueAsNumber: true })}
                        className="relative w-full form-style before:content-['₹'] before:absolute before:top-5 before:w-5"
                    />
                    {errors.coursePrice && <span>Course price is Requiered</span>}
                </div>

                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="courseCategory" className='font-inter texxt-[#F1F2FF]'>CourseCategory<sup className='text-[#EF476F]'>*</sup></label>
                    <select {...register("courseCategory", { required: true })} className='block w-full form-style'>
                        <option value="" disabled>choose a Category</option>
                        {
                            !loading && courseCategories.map((element, index) => <option value={element._id} key={index}>{element.name}</option>)
                        }
                    </select>
                </div>

                {/* create a custom component for handling tags input */}
                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="tags" className='font-inter text-[#F1F2FF]'>Tags<sup className='text-[#EF476F]'>*</sup></label>
                    <input
                        type="text"
                        placeholder='choose a Tag'
                        {...register('tags')}
                        className='w-full form-style'
                    />
                </div>
                {/* create a custom component for handling uploas inp */}
                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="thumbnail" className='font-inter text-[#F1F2FF]'>Course Thumbnail<sup className='text-[#EF476F]'>*</sup></label>
                    <ImageComponent register={register} label='file_upload' />
                </div>
                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="courseBenefits" className='font-inter text-[#F1F2FF]'>Benefits of the course<sup className='text-[#EF476F]'>*</sup></label>
                    <textarea placeholder='Enter Benefits of the course' {...register("courseBenefits", { required: true })} className='w-full form-style' rows={5}>
                    </textarea>
                    {errors.courseBenefits && <span>course Benefits are requiered</span>}
                </div>

                <div>
                    <ul className='flex flex-col items-start justify-center gap-2'>
                        {
                            requirementList.map((element, index) => {
                                return (
                                    <li key={index} className='text-richblack-5'>
                                        <span>{element}</span>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                const arr = requirementList.filter(req => req !== element);
                                                setRequirementList(arr);
                                            }}
                                            className='text-xs text-pure-greys-300'
                                        >
                                            clear
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <input type="text" className='' onChange={(e) => { setReq(e.target.value) }} value={req} />
                    <button onClick={() => {
                        setRequirementList(prev => [...prev, req]);
                        setReq('');
                    }}>Add</button>
                </div>

                <div>
                    {
                        editCourse &&
                        <button onClick={() => { dispacth(setStep(2)) }}>Continue without saving</button>
                    }
                </div>

                <button type='submit' className='bg-[#FFD60A] px-6 py-3 rounded-lg flex items-center justify-center mt-6 float-right'>
                    <p className='font-medium text-center text-black font-inter'>Next</p>
                    <AiOutlineRight className='text-lg text-black' />
                </button>
            </form>
        </div>
    )
}

export default CourseInformationForm