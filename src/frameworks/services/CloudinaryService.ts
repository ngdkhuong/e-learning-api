import crypto from 'crypto';
import { cloudinaryConfig } from '../../utils/cloudinaryConfig';

export const cloudinaryService = () => {
    const uploadFile = async (file: Express.Multer.File) => {
        const result = await cloudinaryConfig.uploader.upload(() => {
            if (error) {
                throw error;
            }
            // Xử lý sau khi tải lên thành công
            console.log(result);
        });

        return {
            name: file.originalname,
            key: result.public_id,
        };
    };

    const uploadAndGetUrl = async (file: Express.Multer.File) => {
        const result = await cloudinary.v2.uploader
            .upload_stream((error, result) => {
                if (error) {
                    throw error;
                }
                // Xử lý sau khi tải lên thành công
                console.log(result);
            })
            .end(file.buffer);

        const url = result.secure_url;

        return {
            name: file.originalname,
            key: result.public_id,
            url,
        };
    };

    const getFile = async (fileKey: string) => {
        // Bạn có thể sử dụng Cloudinary SDK để tạo URL có thời hạn cho file
        // Tuy nhiên, trong ví dụ này, chúng ta chỉ trả về URL cố định
        return `https://res.cloudinary.com/YOUR_CLOUD_NAME/raw/upload/${fileKey}`;
    };

    const removeFile = async (fileKey: string) => {
        // Cloudinary tự quản lý xóa file khi bạn gọi API xóa
        await cloudinary.v2.uploader.destroy(fileKey, { resource_type: 'raw' });
    };

    return {
        uploadFile,
        uploadAndGetUrl,
        getFile,
        removeFile,
    };
};

export type CloudServiceImpl = typeof cloudinaryService;
