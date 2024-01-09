import { v2 } from 'cloudinary'
import streamifier from 'streamifier'

export const uploadBuffer = (buffer: Buffer) => {
    let secure_url;
    const cld_stream = v2.uploader.upload_stream({ folder: process.env.FOLDER }, (err, res) => secure_url = res?.secure_url);
    streamifier.createReadStream(buffer).pipe(cld_stream);
    return secure_url;
}