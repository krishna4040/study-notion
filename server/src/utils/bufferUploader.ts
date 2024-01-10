import { v2 } from 'cloudinary'
require('dotenv').config();

export const uploadBuffer = async (buffer: Buffer): Promise<string> => {
    const uploadPromise: any = await new Promise((resolve, reject) => {
        v2.uploader.upload_stream((error, uploadResult) => {
            if (error) {
                reject(error); // Reject the Promise if there's an error
            } else {
                resolve(uploadResult); // Resolve the Promise with the uploadResult
            }
        }).end(buffer);
    })
    return uploadPromise?.secure_url;
}