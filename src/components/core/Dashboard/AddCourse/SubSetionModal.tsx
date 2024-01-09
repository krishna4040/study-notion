'use client'
import { setCourse } from '@/lib/feature/courseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateSubSection } from '@/services/opr/course';
import React, { SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import ImageComponent from './ImageComponent';

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

const SubSetionModal: React.FunctionComponent<props> = ({ modalData, setModalData, add = false, view = false, edit = false }) => {

    const form = useForm<formValues>();
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = form;

    const dispacth = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);
    const { course } = useAppSelector(state => state.course);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDescription", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
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

    const sumbitHandler = async (data: any) => {
        if (view) {
            return;
        } else if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to course");
            } else {
                // handle edit
                const currValue = getValues();
                const formdata = new FormData();
                formdata.append("sectionId", modalData.sectionId);
                formdata.append("subSectionId", modalData._id);
                if (currValue.lectureTitle !== modalData.title) {
                    formdata.append("title", modalData.title);
                }
                if (currValue.lectureDescription !== modalData.description) {
                    formdata.append("description", modalData.description);
                }
                if (currValue.lectureVideo !== modalData.videoUrl) {
                    formdata.append("videoUrl", modalData.videoUrl);
                }
                setLoading(true);
                const res = await updateSubSection(formdata, token!);
                dispacth(setCourse(res));
                setLoading(false);
            }
        } else {
            // handle add

        }
    }

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 flex flex-col items-center justify-center  overflow-auto bg-white bg-opacity-10 backdrop-blur-sm h-[756px]'>
            <div className='flex py-4 px-6 items-center justify-between bg-richblack-600 border border-richblack-600 w-[665px] scale-75 -mb-24'>
                <h2>
                    {add && "Adding"}
                    {view && "Viewing"}
                    {edit && "Editing"}
                </h2>
                <button onClick={() => { !loading && setModalData(null) }}><RxCross2 /></button>
            </div>
            <form onSubmit={handleSubmit(sumbitHandler)} className='p-8 bg-richblack-800 flex flex-col items-center justify-center gap-6 w-[665px] scale-75'>
                <div className='flex flex-col justify-center gap-[6px] w-full'>
                    <label htmlFor="lectureVideo" className='font-inter text-[#F1F2FF]'>Lecture Video<sup className='text-[#EF476F]'>*</sup></label>
                    <ImageComponent register={register} label='lectureVideo' />
                </div>
                <div className='flex flex-col justify-center gap-[6px] w-full'>
                    <label htmlFor="lectureTitle" className='font-inter text-[#F1F2FF]'>Lecture title<sup className='text-[#EF476F]'>*</sup></label>
                    <input type="text" {...register("lectureTitle", { required: true })} className='w-full form-style' placeholder='Enter Lecture Title' />
                    {errors.lectureTitle && <span className='text-pink-500 text-xs'>Lecture title is requiered</span>}
                </div>
                <div className='flex flex-col justify-center gap-[6px] w-full'>
                    <label htmlFor="lectureDescription">Lecture Description<sup className='text-[#EF476F]'>*</sup></label>
                    <input type="text" {...register("lectureDescription", { required: true })} className='w-full form-style' placeholder='Enter Lecture Description' />
                    {errors.lectureDescription && <span className='text-pink-500 text-xs'>Lecture description is requiered</span>}
                </div>
                {!view &&
                    <div className='flex items-center gap-2 justify-end w-full'>
                        <button type='button' className='bg-richblack-900 px-6 py-3 rounded-lg flex items-center justify-center mt-6 text-richblack-5'>
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

export default SubSetionModal