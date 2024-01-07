'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateDisplayPicture } from "../../../../services/opr/settings"
import Image from 'next/image'

export default function ChangeProfilePicture() {
    const { token } = useAppSelector(state => state.auth)
    const { user } = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        fileInputRef.current!.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // possible error
        const file = e.target.files![0]
        if (file) {
            setImageFile(file)
            previewFile(file)
        }
    }

    const previewFile = (file: File) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () => {
        try {
            setLoading(true);
            const formData = new FormData();
            // possible error
            formData.append("displayPicture", imageFile!);
            dispatch(updateDisplayPicture(token!, formData)).then(() => {
                setLoading(false)
            })
        } catch (error: any) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])
    return (
        <>
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
                <div className="flex items-center gap-x-4">
                    <Image
                        src={previewSource as string || user?.image!}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover"
                        width={140}
                        height={32}
                    />
                    <div className="space-y-2">
                        <p>Change Profile Picture</p>
                        <div className="flex flex-row gap-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/gif, image/jpeg"
                            />
                            <button
                                onClick={handleClick}
                                disabled={loading}
                                className="px-5 py-2 font-semibold rounded-md cursor-pointer bg-richblack-700 text-richblack-50"
                            >
                                Select
                            </button>
                            <button onClick={handleFileUpload}>
                                upload
                                {!loading && <FiUpload className="text-lg text-richblack-900" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
