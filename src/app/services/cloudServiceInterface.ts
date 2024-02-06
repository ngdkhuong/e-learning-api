import { CloudServiceImpl } from '../../frameworks/services/s3CloudService';

export const cloudServiceInterface = (service: ReturnType<CloudServiceImpl>) => {
    const upload = async (file: Express.Multer.File) => await service.uploadFile(file);

    const uploadAndGetUrl = async (file: Express.Multer.File) => await
};
