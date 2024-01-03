import { v2 as cloudinary, } from 'cloudinary'

export const uploadImageToCloudinary = async (file: any, folder: string, height: number, quality: string) => {
    return await cloudinary.uploader.upload(file.tempFilePath, {
        folder: folder,
        resource_type: "auto",
    });
}