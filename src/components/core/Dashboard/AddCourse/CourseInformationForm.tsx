'use client'
import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '@/services/opr/course'
import { AiOutlineRight } from 'react-icons/ai'
import { category } from '@/lib/types'
import { setCourse, setStep } from '@/lib/feature/courseSlice'
import toast from 'react-hot-toast'
import { RxCross2 } from "react-icons/rx";
import ImageComponent from './ImageComponent'

export interface formValues {
    courseTitle: string;
    courseShortDesc: string;
    coursePrice: number;
    courseCategory: string;
    courseBenefits: string;
}

const CourseInformationForm: React.FunctionComponent = () => {

    const form = useForm<formValues>();
    const dispatch = useAppDispatch();

    const { course, editCourse } = useAppSelector(state => state.course);
    const { token } = useAppSelector(state => state.auth);
    const { register, handleSubmit, setValue, getValues, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState<category[]>([]);

    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<string>('');
    const [requirementList, setRequirementList] = useState<string[]>([]);
    const [req, setReq] = useState<string>('');

    const [previewSource, setPreviewSource] = useState<string | null | ArrayBuffer>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

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
                setValue("courseCategory", course?.category._id!);
                setPreviewSource(course?.thumbnail!);
            }
            setLoading(false);
        } catch (error) {
            console.log("could not fetch categories");
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
        const { courseBenefits, courseCategory, coursePrice, courseShortDesc, courseTitle } = getValues();
        return courseBenefits === course?.whatYouWillLearn || courseCategory === course?.category._id || coursePrice === course?.price || courseShortDesc === course?.courseDescription || courseTitle === course?.courseName || requirementList === course?.instructions;
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
                if (tags.toString() !== course?.tag.toString()) {
                    formData.append("tag", JSON.stringify(tags));
                }
                if (currentValues.courseBenefits !== course?.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory !== course?.category._id) {
                    formData.append("category", data.courseCategory);
                }
                if (requirementList.toString() !== course?.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(requirementList))
                }
                //TODO: Pls check edit course
                if (previewSource !== course?.thumbnail) {
                    formData.append("thumbnailImage", previewSource as string);
                }
                setLoading(true);
                const result = await editCourseDetails(formData, token!);
                setLoading(false);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No changes made to the form");
            }
        } else {
            const formData = new FormData();
            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseShortDesc);
            formData.append("price", data.coursePrice.toString());
            formData.append("tag", tags.toString());
            formData.append("instructions", requirementList.toString());
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("categoryId", data.courseCategory);
            formData.append("courseImage", previewSource as string);
            setLoading(true);
            const res = await addCourseDetails(formData, token!);
            if (res) {
                dispatch(setStep(2));
                dispatch(setCourse(res));
            }
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
                        autoComplete='off'
                    />
                    {errors.courseTitle && <span className='text-pink-500 text-xs'>Course Title is Required</span>}
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
                    {errors.courseShortDesc && <span className='text-pink-500 text-xs'>Course Description is Requiered</span>}
                </div>

                <div className='relative flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="" className='font-inter texxt-[#F1F2FF]'>Course Price<sup className='text-[#EF476F]'>*</sup></label>
                    <input
                        type="text"
                        placeholder={`Enter Course Price`}
                        {...register("coursePrice", { required: true, valueAsNumber: true })}
                        className="relative w-full form-style before:content-['₹'] before:absolute before:top-5 before:w-5"
                        autoComplete='off'
                    />
                    {errors.coursePrice && <span className='text-pink-500 text-xs'>Course price is Requiered</span>}
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

                <div className='flex flex-col justify-center gap-2'>
                    <ul className='flex items-center flex-wrap gap-3'>
                        {
                            tags.map((tag, idx) => {
                                return (
                                    <li key={idx} className='flex items-center gap-1 bg-yellow-500 rounded-md p-2 w-fit'>
                                        <span>{tag}</span>
                                        <button type='button' onClick={() => {
                                            const arr = tags.filter(req => req !== tag);
                                            setTags(arr);
                                        }}><RxCross2 /></button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <label htmlFor="tags" className='font-inter text-[#F1F2FF]'>Tags<sup className='text-[#EF476F]'>*</sup></label>
                    <input
                        type="text"
                        placeholder='choose a Tag'
                        className='w-full form-style'
                        autoComplete='off'
                        value={tag}
                        onChange={(e) => { setTag(e.target.value) }}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter' && tag) {
                                setTags(prev => [...prev, tag]);
                                setTag('');
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="thumbnail" className='font-inter text-[#F1F2FF]'>Course Thumbnail<sup className='text-[#EF476F]'>*</sup></label>
                    <ImageComponent previewSource={previewSource} setPreviewSource={setPreviewSource} setImageFile={setImageFile} />
                </div>

                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="courseBenefits" className='font-inter text-[#F1F2FF]'>Benefits of the course<sup className='text-[#EF476F]'>*</sup></label>
                    <textarea placeholder='Enter Benefits of the course' {...register("courseBenefits", { required: true })} className='w-full form-style' rows={5}>
                    </textarea>
                    {errors.courseBenefits && <span className='text-pink-500 text-xs'>course Benefits are requiered</span>}
                </div>

                <div className='flex flex-col items-start justify-center gap-2'>
                    <ul className='flex flex-col items-start justify-center gap-2'>
                        {
                            requirementList.map((element, index) => {
                                return (
                                    <li key={index} className='text-richblack-5 flex items-baseline gap-2'>
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
                    <label htmlFor="req" className='font-inter text-[#F1F2FF]'>Requirements/Instructions<sup className='text-[#EF476F]'>*</sup></label>
                    <input type="text" onChange={(e) => { setReq(e.target.value) }} value={req} className='w-full form-style' autoComplete='off' placeholder='Enter course requierement' />
                    <button type='button' className='text-yellow-50' onClick={() => {
                        if (req) {
                            setRequirementList(prev => [...prev, req]);
                            setReq('');
                        }
                    }}>Add</button>
                </div>

                <div>
                    {
                        editCourse &&
                        <button onClick={() => { dispatch(setStep(2)) }}>Continue without saving</button>
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