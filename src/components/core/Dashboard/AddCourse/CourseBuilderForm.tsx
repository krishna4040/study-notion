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
import SubSectionModal from './SubSetionModal'
import { course, subSection } from '@/lib/types';

const CourseBuilderForm = () => {

    const form = useForm<{
        sectionName: string;
    }>();
    const { register, handleSubmit, formState: { errors }, setValue } = form;

    const dispacth = useAppDispatch();
    const { course } = useAppSelector(state => state.course);
    const { token } = useAppSelector(state => state.auth)

    const [editSectionName, setEditSectionName] = useState(false);
    const [loading, setLoading] = useState(false);

    const [addSubSection, setAddSubSection] = useState<string>("");
    const [editSubSection, setEditSubSection] = useState<(subSection & { sectionId: string }) | null>(null);
    const [viewSubSection, setViewSubSection] = useState<subSection | null>(null);
    const [confirmationModal, setConfirmationModal] = useState<modalData | null>(null);

    const sumbitHandler = async (data: any) => {
        setLoading(true);
        let res;
        if (editSectionName) {
            res = await updateSection({ sectionName: data.sectionName, courseId: course?._id }, token!);
        } else {
            res = await createSection({ sectionName: data.sectionName, courseId: course?._id }, token!);
        }
        if (res) {
            dispacth(setCourse(res));
            setEditSectionName(false);
            setValue("sectionName", "");
        }
    }

    const editSectionNameHandler = (sectionId: string, sectionName: string) => { }
    const deleteSectionHandler = async (sectionId: string) => {
        const res = await deleteSection({ sectionId, courseId: course?._id }, token!);
        if (res) {
            dispacth(setCourse(res));
        }
        setConfirmationModal(null);
    }
    const handleDeleteSubSection = async (subSectionId: string, sectionId: string) => {
        const res = await deleteSubSection({ subSectionId, sectionId }, token!);
        if (res) {
            // const updatedCourse = {...course, courseContent: course?.courseContent.map(sec => sec._id === sectionId ? res : sec)}
            // dispacth(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }

    return (
        <div>
            <h2>Couse Builder</h2>
            <form onSubmit={handleSubmit(sumbitHandler)}>
                <div>
                    <label htmlFor="sectiionName">Section Name <sup>*</sup></label>
                    <input type="text" placeholder='Add Section Name...' {...register("sectionName", { required: true })} />
                    {errors.sectionName && <span>Section name is requiered</span>}
                </div>
                <div>
                    <button>
                        {editSectionName ? "Edit Section Name" : "Create Section"}
                        <CiCirclePlus />
                    </button>
                    {editSectionName && <button type='button' onClick={() => { setEditSectionName(false); setValue("sectionName", "") }}>Cancel Edit</button>}
                </div>
            </form>
            {
                course?.courseContent.length! > 0 &&
                // Nested view
                <div>
                    {
                        course?.courseContent.map(section => {
                            return (
                                <details key={section._id} open>
                                    <summary>
                                        <div>
                                            <RxDropdownMenu />
                                            <p>{section.sectionName}</p>
                                        </div>
                                        <div>
                                            <button onClick={() => { editSectionNameHandler(section._id, section.sectionName) }}><MdModeEditOutline /></button>
                                            <button onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Delete this section",
                                                    text2: "All The lectures in this section will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => { deleteSectionHandler(section._id) },
                                                    btn2Handler: () => { setConfirmationModal(null) }
                                                })
                                            }}><RiDeleteBinFill /></button>
                                            <span>|</span>
                                            <BiSolidDownArrow />
                                        </div>
                                    </summary>
                                    <div>
                                        {
                                            section.subSection.map(sub => {
                                                return (
                                                    <div key={sub._id} onClick={() => { setViewSubSection(sub) }}>
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
                                        <button onClick={() => { setAddSubSection(section._id) }}>
                                            Add Lecture
                                            <CiCirclePlus />
                                        </button>
                                    </div>
                                </details>
                            )
                        })
                    }
                    {addSubSection && <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} />}
                    {editSubSection && <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} />}
                    {viewSubSection && <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} />}
                    {confirmationModal && <Modal modalData={confirmationModal} />}
                </div>
            }
            <div>
                <button onClick={() => {
                    dispacth(setEditCourse(true));
                    dispacth(setStep(1));
                }}>Back</button>

                <button onClick={() => {
                    if (course?.courseContent.length === 0 || course?.courseContent.some(section => section.subSection.length === 0)) {
                        toast.error("Add atleat one section or subsection");
                        return;
                    }
                    dispacth(setStep(3));
                }}>
                    Next
                    <IoIosArrowDroprightCircle />
                </button>
            </div>
        </div>
    )
}

export default CourseBuilderForm