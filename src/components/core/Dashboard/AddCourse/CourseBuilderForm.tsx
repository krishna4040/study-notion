'use client'
import { setCourse, setEditCourse, setStep } from '@/lib/feature/courseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createSection, deleteSection, deleteSubSection, updateSection } from '@/services/opr/course';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { CiCirclePlus } from "react-icons/ci";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import Modal, { modalData } from '@/components/common/Modal';
import { BiSolidDownArrow } from "react-icons/bi";
import SubSectionModal from './SubSectionModal'
import { subSection } from '@/lib/types';

const CourseBuilderForm = () => {

    const form = useForm<{
        sectionName: string;
    }>();
    const { register, handleSubmit, formState: { errors }, setValue } = form;

    const dispatch = useAppDispatch();
    const { course } = useAppSelector(state => state.course);
    const { token } = useAppSelector(state => state.auth)

    const [editSectionName, setEditSectionName] = useState(false);
    const [loading, setLoading] = useState(false);

    const [addSubSection, setAddSubSection] = useState<string>("");
    const [editSubSection, setEditSubSection] = useState<(subSection & { sectionId: string }) | null>(null);
    const [viewSubSection, setViewSubSection] = useState<subSection | null>(null);
    const [confirmationModal, setConfirmationModal] = useState<modalData | null>(null);

    const submitHandler = async (data: any) => {
        setLoading(true);
        let res;
        if (editSectionName) {
            res = await updateSection({ sectionName: data.sectionName, courseId: course?._id }, token!);
        } else {
            res = await createSection({ sectionName: data.sectionName, courseId: course?._id }, token!);
        }
        if (res) {
            dispatch(setCourse(res));
            setEditSectionName(false);
            setValue("sectionName", "");
        }
    }

    const editSectionNameHandler = (sectionId: string, sectionName: string) => { }
    const deleteSectionHandler = async (sectionId: string) => {
        const res = await deleteSection({ sectionId, courseId: course?._id }, token!);
        if (res) {
            dispatch(setCourse(res));
        }
        setConfirmationModal(null);
    }
    const handleDeleteSubSection = async (subSectionId: string, sectionId: string) => {
        const res = await deleteSubSection({ subSectionId, sectionId }, token!);
        if (res) {
            // const updatedCourse = {...course, courseContent: course?.courseContent.map(sec => sec._id === sectionId ? res : sec)}
            // dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }

    return (
        <div>
            <div className='p-6 space-y-8 rounded-md border-richblack-700 bg-richblack-800 mt-7'>
                <h2 className='text-richblack-5 font-semibold text-2xl font-inter'>Course Builder</h2>
                <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col items-start justify-center gap-3 w-full'>
                    <div className='w-full'>
                        <input type="text" placeholder='Add Section to build your course' {...register("sectionName", { required: true })} className='w-full form-style' />
                        {errors.sectionName && <span className='text-pink-500 text-xs'>Section name is required</span>}
                    </div>
                    <div>
                        <button className='flex items-center justify-start gap-2 rounded-lg border py-3 px-4 text-yellow-50'>
                            <CiCirclePlus />
                            {editSectionName ? "Edit Section Name" : "Create Section"}
                        </button>
                        {editSectionName && <button type='button' onClick={() => { setEditSectionName(false); setValue("sectionName", "") }}>Cancel Edit</button>}
                    </div>
                </form>
                {
                    course?.courseContent && course.courseContent.length > 0 &&
                    // Nested view
                    <div className='px-6 bg-richblack-700 border rounded-lg border-richblack-600'>
                        {
                            course?.courseContent.map(section => {
                                return (
                                    <details key={section._id} open>
                                        <summary className='flex items-center justify-between py-3'>
                                            <div className='flex items-center gap-2'>
                                                <RxDropdownMenu className='text-xl text-richblack-400' />
                                                <p className='font-semibold font-inter text-richblack-50'>{section.sectionName}</p>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <button onClick={() => { editSectionNameHandler(section._id, section.sectionName) }}><MdModeEditOutline className='text-xl text-richblack-400' /></button>
                                                <button onClick={() => {
                                                    setConfirmationModal({
                                                        text1: "Delete this section",
                                                        text2: "All The lectures in this section will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => { deleteSectionHandler(section._id) },
                                                        btn2Handler: () => { setConfirmationModal(null) }
                                                    })
                                                }}><RiDeleteBinFill className='text-xl text-richblack-400' /></button>
                                                <span>|</span>
                                                <BiSolidDownArrow className='text-xl text-richblack-400' />
                                            </div>
                                        </summary>
                                        <div>
                                            {
                                                section.subSection.map(sub => {
                                                    return (
                                                        <div key={sub._id} onClick={() => { setViewSubSection(sub) }} className='border-b py-3 pl-6'>
                                                            <div>
                                                                <RxDropdownMenu />
                                                                <p>{sub.title}</p>
                                                            </div>
                                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                                <button onClick={() => { setEditSubSection({ ...sub, sectionId: section._id }) }}><MdModeEditOutline /></button>
                                                                <button onClick={() => {
                                                                    setConfirmationModal({
                                                                        text1: "Delete this sub section",
                                                                        text2: "Selected lecture will be deleted",
                                                                        btn1Text: "Delete",
                                                                        btn2Text: "Cancel",
                                                                        btn1Handler: () => { handleDeleteSubSection(sub._id, section._id) },
                                                                        btn2Handler: () => { setConfirmationModal(null) }
                                                                    })
                                                                }}>
                                                                    <RiDeleteBinFill />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <button onClick={() => { setAddSubSection(section._id) }} className='flex items-center justify-center text-yellow-50 gap-1 py-4'>
                                                <CiCirclePlus />
                                                <span>Add Lecture</span>
                                            </button>
                                        </div>
                                    </details>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className='flex items-center justify-end gap-3'>
                <button onClick={() => {
                    dispatch(setEditCourse(true));
                    dispatch(setStep(1));
                }} className='bg-richblack-900 px-6 py-3 rounded-lg flex items-center justify-center mt-6 text-richblack-5'>
                    Back
                </button>

                <button onClick={() => {
                    if (course?.courseContent.length === 0 || course?.courseContent.some(section => section.subSection.length === 0)) {
                        toast.error("Add at least one section or subsection");
                        return;
                    }
                    dispatch(setStep(3));
                }} className='bg-[#FFD60A] px-6 py-3 rounded-lg flex items-center justify-center mt-6 text-black'>
                    Next
                    <IoIosArrowDroprightCircle />
                </button>
            </div>
            {addSubSection && <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />}
            {editSubSection && <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />}
            {viewSubSection && <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />}
            {confirmationModal && <Modal modalData={confirmationModal} />}
        </div>
    )
}

export default CourseBuilderForm