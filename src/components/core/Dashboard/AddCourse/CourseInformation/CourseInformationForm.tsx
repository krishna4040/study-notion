'use client'
import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchCourseCategories } from '@/services/opr/course'
import upload from '@/assets/Images/upload.svg'
import { AiOutlineRight } from 'react-icons/ai'
import { StaticImageData } from 'next/image'
import { category } from '@/lib/types'
import Image from 'next/image'

export interface formValues {
    courseTitle: string;
    courseShortDesc: string;
    coursePrice: number;
    courseCategory: category;
    file_upload: StaticImageData | string;
    courseBenefits: string;
    tags: string[];
    courseRequirement: string[];
}

const CourseInformationForm = () => {

    const form = useForm<formValues>();
    const dispacth = useAppDispatch();

    const { course, editCourse } = useAppSelector(state => state.course);
    const { register, handleSubmit, setValue, getValues, formState, control, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState<category[]>([]);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewSource, setPreviewSource] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const submitHandler = async (data: formValues) => {
        console.log(data);
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if (file) {
            setImageFile(file);
            const reader = new FileReader()
            reader.readAsDataURL(file)
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
                    <label htmlFor="tags" className='font-inter texxt-[#F1F2FF]'>Tags<sup className='text-[#EF476F]'>*</sup></label>
                    <input
                        type="text"
                        placeholder='choose a Tag'
                        {...register('tags')}
                        className='w-full form-style'
                    />
                </div>
                {/* create a custom component for handling uploas inp */}
                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="thumbnail" className='font-inter texxt-[#F1F2FF]'>Course Thumbnail<sup className='text-[#EF476F]'>*</sup></label>
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
                            <input type="file" {...register("file_upload")} id="file-upload" accept=".jpg, .jpeg, .png" className="absolute hidden top-0 left-0 w-fit h-full opacity-0 cursor-pointer" onChange={changeHandler} ref={fileInputRef} />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="courseBenefits" className='font-inter texxt-[#F1F2FF]'>Benefits of the course<sup className='text-[#EF476F]'>*</sup></label>
                    <textarea placeholder='Enter Benefits of the course' {...register("courseBenefits", { required: true })} className='w-full form-style' rows={5}>
                    </textarea>
                    {errors.courseBenefits && <span>course Benefits are requiered</span>}
                </div>

                <div>
                    <ul>
                        {
                            requirementList.map((element, index) => {
                                return (
                                    <li key={index}>
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

                <button type='submit' className='bg-[#FFD60A] px-6 py-3 rounded-lg flex items-center justify-center mt-6 float-right'>
                    <p className='font-medium text-center text-black font-inter'>Next</p>
                    <AiOutlineRight className='text-lg text-black' />
                </button>
            </form>
        </div>
    )
}

export default CourseInformationForm