import React, { ChangeEvent, useRef, useState } from 'react'
import upload from '@/assets/Images/upload.svg'
import Image from 'next/image'

type props = {
    previewSource: string | ArrayBuffer | null;
    setPreviewSource: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
    isVideo?: boolean;
}

const ImageComponent: React.FunctionComponent<props> = ({ previewSource, setPreviewSource, setImageFile, isVideo }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        setImageFile(file);
        if (file) {
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
        isVideo ?
            <div className={`${!previewSource && 'flex flex-col items-center justify-center w-full gap-4 px-3 py-8 border border-dashed rounded-lg form-style h-80 overflow-hidden bg-cover'}`}>
                {previewSource && <video src={previewSource as string} autoPlay loop muted></video>}
                {
                    !previewSource &&
                    <>
                        <Image src={upload} alt="upload" />
                        <p className='font-inter text-center text-sm text-[#999DAA]'>Drag and drop an image, or <span className='text-[#FFD60A] font-semibold'>Browse</span> <br /> Max 6MB each (12MB for videos)</p>
                        <ul className='flex justify-between gap-5 list-disc list-inside items-center'>
                            <li className='text-[#6E727F] font-inter font-semibold text-sm'>Aspect ratio 16:9</li>
                            <li className='text-[#6E727F] font-inter font-semibold text-sm'>Recommended size 1024x576</li>
                        </ul>
                    </>
                }
                <div className="relative rounded-md shadow-sm mt-3">
                    <label htmlFor="file-upload" onClick={selectHandler} className="flex items-center justify-center px-4 py-2 bg-indigo-500 text-black rounded-md cursor-pointer w-fit bg-yellow-50 font-medium font-inter">
                        {previewSource ? "Choose a File" : "Change File"}
                    </label>
                    <input type="file" id="file-upload" className="absolute hidden top-0 left-0 w-fit h-full opacity-0 cursor-pointer" onChange={changeHandler} ref={fileInputRef} accept='video/*' />
                </div>
            </div> :
            <div className={`flex flex-col items-center justify-center w-full gap-4 px-3 py-8 border border-dashed rounded-lg form-style h-80 overflow-hidden bg-cover`} style={{
                backgroundImage: `url(${previewSource})`
            }}>
                {
                    !previewSource &&
                    <>
                        <Image src={upload} alt="upload" />
                        <p className='font-inter text-center text-sm text-[#999DAA]'>Drag and drop an image, or <span className='text-[#FFD60A] font-semibold'>Browse</span> <br /> Max 6MB each (12MB for videos)</p>
                        <ul className='flex justify-between gap-5 list-disc list-inside items-center'>
                            <li className='text-[#6E727F] font-inter font-semibold text-sm'>Aspect ratio 16:9</li>
                            <li className='text-[#6E727F] font-inter font-semibold text-sm'>Recommended size 1024x576</li>
                        </ul>
                    </>
                }
                <div className="relative rounded-md shadow-sm">
                    <label htmlFor="file-upload" onClick={selectHandler} className="flex items-center justify-center px-4 py-2 bg-indigo-500 text-black rounded-md cursor-pointer w-fit bg-yellow-50 font-medium font-inter">
                        {previewSource ? "Choose a File" : "Change File"}
                    </label>
                    <input type="file" id="file-upload" className="absolute hidden top-0 left-0 w-fit h-full opacity-0 cursor-pointer" onChange={changeHandler} ref={fileInputRef} accept='image/*' />
                </div>
            </div>
    )
}

export default ImageComponent