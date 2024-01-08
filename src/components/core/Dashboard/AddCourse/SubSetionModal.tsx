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
        <div>
            <div>
                <h2>
                    {add && "Adding"}
                    {view && "Viewing"}
                    {edit && "Editing"}
                </h2>
                <button onClick={() => { !loading && setModalData(null) }}><RxCross2 /></button>
            </div>
            <form onSubmit={handleSubmit(sumbitHandler)}>
                <div className='flex flex-col justify-center gap-[6px]'>
                    <label htmlFor="lectureVideo" className='font-inter text-[#F1F2FF]'>Lecture Video<sup className='text-[#EF476F]'>*</sup></label>
                    <ImageComponent register={register} label='lectureVideo' />
                </div>
                <div>
                    <label htmlFor="lectureTitle">Lecture title</label>
                    <input type="text" {...register("lectureTitle", { required: true })} />
                    {errors.lectureTitle && <span>Lecture title is requiered</span>}
                </div>
                <div>
                    <label htmlFor="lectureDescription">Lecture Description</label>
                    <input type="text" {...register("lectureDescription", { required: true })} />
                    {errors.lectureDescription && <span>Lecture description is requiered</span>}
                </div>
                {!view &&
                    <button>
                        {edit ? "Save Changes" : "Save"}
                    </button>
                }
            </form>
        </div>
    )
}

export default SubSetionModal