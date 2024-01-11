import { v2 as cloudinary, } from 'cloudinary'
import { UploadedFile } from 'express-fileupload';

export const uploadImageToCloudinary = async (file: UploadedFile, folder: string, height?: number, quality?: string) => {
    return await cloudinary.uploader.upload(file.tempFilePath, {
        folder: folder,
        resource_type: "auto",
    });
}