'use client'
import { setCourse } from '@/lib/feature/courseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createSubSection, updateSubSection } from '@/services/opr/course';
import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import ImageComponent from './ImageComponent';
import { course } from '@/lib/types';

type props = {
    modalData: any;
    setModalData: React.Dispatch<SetStateAction<any>>;
    add?: boolean;
    view?: boolean;
    edit?: boolean;
}

export type formValues = {
    lectureTitle: string;
    lectureDescription: string;
    lectureVideo: string;
}

const SubSectionModal: React.FunctionComponent<props> = ({ modalData, setModalData, add = false, view = false, edit = false }) => {

    const form = useForm<formValues>();
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = form;

    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);
    const { course } = useAppSelector(state => state.course);

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>(null);

    const [timeDuration, setTimeDuration] = useState({
        HH: '',
        MM: '',
        SS: '',
        total: ''
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTimeDuration(prev => {
            const updatedDuration = { ...prev, [name]: value };
            const { HH, MM, SS } = updatedDuration;
            const total = `${HH}HH${MM}MM${SS}SS`;
            return { ...updatedDuration, total };
        });
    }

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDescription", modalData.description);
            setPreviewSource(modalData.videoUrl);
        }
    }, []);

    const isFormUpdated = (): boolean => {
        const currentValues = getValues();
        if (currentValues.lectureDescription !== modalData.title ||
            currentValues.lectureTitle !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        return false;
    }

    const submitHandler = async (data: formValues) => {
        if (view) {
            return;
        } else if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to course");
            } else {
                // handle edit
                const currValue = getValues();
                const formData = new FormData();
                formData.append("sectionId", modalData.sectionId);
                formData.append("subSectionId", modalData._id);
                if (currValue.lectureTitle !== modalData.title) {
                    formData.append("title", modalData.title);
                }
                if (currValue.lectureDescription !== modalData.description) {
                    formData.append("description", modalData.description);
                }
                //TODO: Pls check subsection edit
                if (currValue.lectureVideo !== modalData.videoUrl) {
                    // check under process
                }
                setLoading(true);
                const res = await updateSubSection(formData, token!);
                const updatedCourse = { ...course, courseContent: res };
                dispatch(setCourse(updatedCourse as course));
                setLoading(false);
            }
        } else {
            const formData = new FormData();
            formData.append("sectionId", modalData);
            formData.append("title", data.lectureTitle);
            formData.append("description", data.lectureDescription);
            formData.append("timeDuration", timeDuration.total);
            formData.append("video", imageFile!, imageFile?.name);
            setLoading(true);
            const res = await createSubSection(formData, token!);
            const updatedCourse = { ...course, courseContent: res };
            console.log(updatedCourse);
            dispatch(setCourse(updatedCourse as course));
            setModalData(null);
            setLoading(false);
        }
    }

    return (
        <div className='fixed inset-0 z-[1000] pt-6 !mt-0 flex flex-col items-center justify-center  overflow-auto bg-white bg-opacity-10 backdrop-blur-sm h-[756px] '>
            <div className='flex py-4 px-6 items-center justify-between bg-richblack-600 border border-richblack-600 w-[665px] scale-75 -mb-[7.25rem]'>
                <h2>
                    {add && "Adding"}
                    {view && "Viewing"}
                    {edit && "Editing"}
                </h2>
                <button onClick={() => { !loading && setModalData(null) }}><RxCross2 /></button>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className='p-8 bg-richblack-800 flex flex-col items-center justify-center gap-6 w-[665px] scale-75'>
                <div className='flex flex-col justify-center gap-[6px] w-full'>
                    <label htmlFor="lectureVideo" className='font-inter text-[#F1F2FF]'>Lecture Video<sup className='text-[#EF476F]'>*</sup></label>
                    <ImageComponent previewSource={previewSource} setPreviewSource={setPreviewSource} setImageFile={setImageFile} isVideo={true} />
                </div>
                <div className='flex flex-col justify-center gap-[6px] w-full'>
                    <label htmlFor="lectureTitle" className='font-inter text-[#F1F2FF]'>Lecture title<sup className='text-[#EF476F]'>*</sup></label>
                    <input type="text" {...register("lectureTitle", { required: true })} className='w-full form-style' placeholder='Enter Lecture Title' />
                    {errors.lectureTitle && <span className='text-pink-500 text-xs'>Lecture title is required</span>}
                </div>
                <div className='flex flex-col justify-center gap-[6px] w-full'>
                    <label htmlFor="timeDuration" className='font-inter text-[#F1F2FF]'>Video Playback Time<sup className='text-[#EF476F]'>*</sup></label>
                    <div className='flex items-center justify-evenly gap-2'>
                        <input onChange={changeHandler} type="number" className='w-full form-style' placeholder='HH' name='HH' />
                        <input onChange={changeHandler} type="number" className='w-full form-style' placeholder='MM' name='MM' max={60} />
                        <input onChange={changeHandler} type="number" className='w-full form-style' placeholder='SS' name='SS' max={60} />
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-[6px] w-full'>
                    <label htmlFor="lectureDescription">Lecture Description<sup className='text-[#EF476F]'>*</sup></label>
                    <input type="text" {...register("lectureDescription", { required: true })} className='w-full form-style' placeholder='Enter Lecture Description' />
                    {errors.lectureDescription && <span className='text-pink-500 text-xs'>Lecture description is required</span>}
                </div>
                {!view &&
                    <div className='flex items-center gap-2 justify-end w-full'>
                        <button type='button' className='bg-richblack-900 px-6 py-3 rounded-lg flex items-center justify-center mt-6 text-richblack-5' onClick={() => {
                            setPreviewSource(null);
                            setModalData(null);
                        }}>
                            Cancel
                        </button>
                        <button className='bg-[#FFD60A] px-6 py-3 rounded-lg flex items-center justify-center mt-6 text-black'>
                            {edit ? "Save Changes" : "Save"}
                        </button>
                    </div>
                }
            </form>
        </div>
    )
}

export default SubSectionModal