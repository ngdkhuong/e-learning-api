import { RedisClient } from '../app';
import { StudentDbInterface } from '../app/repositories/studentsDbRepository';
import { AuthServiceInterface } from '../app/services/authServiceInterface';
import { changePasswordU } from '../app/usecases/student';
import { StudentRepositoryMongoDB } from '../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { RedisRepositoryImpl } from '../frameworks/database/redis/redisCacheRepository';
import { AuthService } from '../frameworks/services/authService';
import { CustomRequest } from '../types/customRequest';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

const studentController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    studentDbRepository: StudentDbInterface,
    studentDbRepositoryImpl: StudentRepositoryMongoDB,
    // contactDbRepository: ContactDbInterface,
    // contactDbRepositoryImpl: ContactRepoImpl,
    // cloudServiceInterface: CloudServiceInterface,
    // cloudServiceImpl: CloudServiceImpl,
    // cacheDbRepository: CacheRepositoryInterface,
    // cacheDbRepositoryImpl: RedisRepositoryImpl,
    // cacheClient: RedisClient,
) => {
    const dbRepositoryStudent = studentDbRepository(studentDbRepositoryImpl());

    // const dbRepositoryCache = cacheDbRepository(cacheDbRepositoryImpl(cacheClient));

    const authService = authServiceInterface(authServiceImpl());

    const changePassword = asyncHandler(async (req: CustomRequest, res: Response) => {
        const passwordInfo: { currentPassword: string; newPassword: string } = req.body;

        const studentId: string | undefined = req.user?.Id;

        await changePasswordU(studentId, passwordInfo, authService, dbRepositoryStudent);

        res.status(200).json({
            status: 'success',
            message: 'Password changed successfully',
            data: null,
        });
    });

    return {
        changePassword,
    };
};

export default studentController;
