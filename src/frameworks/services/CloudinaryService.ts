import { v2 as cloudinary } from 'cloudinary';
import configKeys from './../../config';
import { UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: configKeys.CLOUDINARY_URL,
    api_key: configKeys.CLOUDINARY_API_KEY,
    api_secret: configKeys.CLOUDINARY_API_SECRET,
});

export const cloudinaryService = () => {
    const uploadFile = async (file: Express.Multer.File): Promise<UploadApiResponse> => {
        try {
            const result = await cloudinary.uploader.upload('courses');
            return result;
        } catch (error) {
            throw new Error('Failed to upload file to Cloudinary');
        }
    };

    const getFile = async (fileKey: string) => {
        return cloudinary.url(fileKey);
    };

    const removeFile = async (fileKey: string): Promise<void> => {
        try {
            await cloudinary.uploader.destroy(fileKey);
        } catch (error) {
            throw new Error('Failed to delete file from Cloudinary');
        }
    };

    return {
        uploadFile,
        getFile,
        removeFile,
    };
};

export type CloudServiceImpl = typeof cloudinaryService;
