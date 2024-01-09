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
import upload from '@/assets/Images/upload.svg'
import Image from 'next/image'

export interface formValues {
    courseTitle: string;
    courseShortDesc: string;
    coursePrice: number;
    courseCategory: string;
    courseBenefits: string;
}

const CourseInformationForm: React.FunctionComponent = () => {

    const form = useForm<formValues>();
    const dispacth = useAppDispatch();

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
                if (previewSource !== course?.thumbnail) {
                    formData.append("thumbnailImage", previewSource as string);
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
            formdata.append("tag", tags.toString());
            formdata.append("instructions", requirementList.toString());
            formdata.append("courseImage", previewSource as string);
            formdata.append("whatYouWillLearn", data.courseBenefits);
            formdata.append("categoryId", data.courseCategory);
            setLoading(true);
            const res = await addCourseDetails(formdata, token!);
            if (res) {
                dispacth(setStep(2));
                dispacth(setCourse(res));
            }
            setLoading(false);
        }
    }

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewSource, setPreviewSource] = useState<string | null | ArrayBuffer>(null);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPreviewSource(reader.result as string);
            }
        }
    }

    const selectHandler = () => {
        fileInputRef.current?.click();
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
                    {errors.courseTitle && <span className='text-pink-500 text-xs'>Course Title is Requiered</span>}
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
                    <div className={`flex flex-col items-center justify-center w-full gap-4 px-3 py-8 border border-dashed rounded-lg form-style h-80 overflow-hidden bg-cover`} style={{
                        backgroundImage: `url(${previewSource})`
                    }}>
                        <Image src={upload} alt="upload" />
                        <p className='font-inter text-center text-sm text-[#999DAA]'>Drag and drop an image, or <span className='text-[#FFD60A] font-semibold'>Browse</span> <br /> Max 6MB each (12MB for videos)</p>
                        <ul className='flex justify-between gap-5 list-disc list-inside itemc-center'>
                            <li className='text-[#6E727F] font-inter font-semibold text-sm'>Aspect ratio 16:9</li>
                            <li className='text-[#6E727F] font-inter font-semibold text-sm'>Recommended size 1024x576</li>
                        </ul>
                        <div className="relative rounded-md shadow-sm">
                            <label htmlFor="file-upload" onClick={selectHandler} className="flex items-center justify-center px-4 py-2 bg-indigo-500 text-black rounded-md cursor-pointer w-fit bg-yellow-50 font-medium font-inter">
                                Choose a File
                            </label>
                            <input type="file" accept=".jpg, .jpeg, .png" className="absolute hidden top-0 left-0 w-fit h-full opacity-0 cursor-pointer" onChange={changeHandler} ref={fileInputRef} />
                        </div>
                    </div>
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