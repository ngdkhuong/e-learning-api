import cloudinary from 'cloudinary';
import configKeys from './../config';

export const cloudinaryConfig = cloudinary.v2.config({
    cloud_name: configKeys.CLOUDINARY_URL,
    api_key: configKeys.CLOUDINARY_API_KEY,
    api_secret: configKeys.CLOUDINARY_API_SECRET,
});
