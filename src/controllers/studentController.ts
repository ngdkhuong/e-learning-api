import { RedisClient } from '../app';
import { StudentDbInterface } from '../app/repositories/studentDbRepository';
import { AuthServiceInterface } from '../app/services/authServiceInterface';
import { changePasswordU, getStudentDetailsU, updateProfileU } from '../app/usecases/student';
import { StudentRepositoryMongoDB } from '../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { RedisRepositoryImpl } from '../frameworks/database/redis/redisCacheRepository';
import { AuthService } from '../frameworks/services/authService';
import { CustomRequest } from '../types/customRequest';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { CloudServiceImpl } from '../frameworks/services/CloudinaryService';
import { CacheRepositoryInterface } from '../app/repositories/cachedRepoInterface';
import { CloudServiceInterface } from '../app/services/cloudServiceInterface';
import { ContactDbInterface } from '../app/repositories/contactRepoInterface';
import { ContactRepoImpl } from '../frameworks/database/mongodb/repositories/contactRepoMongoDb';
import { StudentUpdateInfo } from '../types/studentInterface';
import { ContactInterface } from './../types/contact';
import { addContactU } from './../app/usecases/contact';
import {
    blockStudentU,
    getAllBlockedStudentsU,
    getAllStudentsU,
    unblockStudentU,
} from './../app/usecases/management/studentManagement';

const studentController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    studentDbRepository: StudentDbInterface,
    studentDbRepositoryImpl: StudentRepositoryMongoDB,
    contactDbRepository: ContactDbInterface,
    contactDbRepositoryImpl: ContactRepoImpl,
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudServiceImpl,
    cacheDbRepository: CacheRepositoryInterface,
    cacheDbRepositoryImpl: RedisRepositoryImpl,
    cacheClient: RedisClient,
) => {
    const dbRepositoryStudent = studentDbRepository(studentDbRepositoryImpl());

    const dbRepositoryCache = cacheDbRepository(cacheDbRepositoryImpl(cacheClient));

    const dbRepositoryContact = contactDbRepository(contactDbRepositoryImpl());

    const cloudService = cloudServiceInterface(cloudServiceImpl());

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

    const updateProfile = asyncHandler(async (req: CustomRequest, res: Response) => {
        const studentInfo: StudentUpdateInfo = req.body;

        const studentId: string | undefined = req.user?.Id;

        const profilePic: Express.Multer.File = req.file as Express.Multer.File;

        await updateProfileU(studentId, studentInfo, profilePic, cloudService, dbRepositoryStudent);

        await dbRepositoryCache.clearCache(studentId ?? '');

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: null,
        });
    });

    const getStudentDetails = asyncHandler(async (req: CustomRequest, res: Response) => {
        const studentId: string | undefined = req.user?.Id;
        const studentDetails = await getStudentDetailsU(studentId, cloudService, dbRepositoryStudent);
        const cacheOptions = {
            key: `${studentId}`,
            expireTimeSec: 600,
            data: JSON.stringify(studentDetails),
        };
        await dbRepositoryCache.setCache(cacheOptions);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved student details',
            data: studentDetails,
        });
    });

    const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
        const students = await getAllStudentsU(cloudService, dbRepositoryStudent);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved all student details',
            data: students,
        });
    });

    const blockStudent = asyncHandler(async (req: Request, res: Response) => {
        const studentId: string = req.params.studentId;
        const reason: string = req.body.reason;
        await blockStudentU(studentId, reason, dbRepositoryStudent);
        res.status(200).json({
            status: 'success',
            message: 'Successfully blocked student',
            data: null,
        });
    });

    const unblockStudent = asyncHandler(async (req: Request, res: Response) => {
        const studentId: string = req.params.studentId;
        await unblockStudentU(studentId, dbRepositoryStudent);
        res.status(200).json({
            status: 'success',
            message: 'Successfully unblocked student',
            data: null,
        });
    });

    const getAllBlockedStudents = asyncHandler(async (req: Request, res: Response) => {
        const students = await getAllBlockedStudentsU(cloudService, dbRepositoryStudent);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved all students',
            data: students,
        });
    });

    const addContact = asyncHandler(async (req: Request, res: Response) => {
        const contactInfo: ContactInterface = req.body;
        await addContactU(contactInfo, dbRepositoryContact);
        res.status(200).json({
            status: 'success',
            message: 'Successfully submitted your response',
            data: null,
        });
    });

    return {
        changePassword,
        updateProfile,
        getStudentDetails,
        getAllStudents,
        blockStudent,
        unblockStudent,
        getAllBlockedStudents,
        addContact,
    };
};

export default studentController;
