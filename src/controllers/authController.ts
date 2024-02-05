import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthServiceInterface } from '../app/services/authServiceInterface';
import { AuthService } from '../frameworks/services/authService';
import { StudentDbInterface } from '../app/repositories/studentsDbRepository';
import { StudentRepositoryMongoDB } from './../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { studentLogin, studentRegister } from '../app/usecases/auth/studentAuth';
import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';
import { RefreshTokenDbInterface } from '@src/app/repositories/refreshTokenDBRepository';
import { RefreshTokenRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';

const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    // cloudServiceInterface: CloudServiceInterface,
    // cloudServiceImpl: CloudServiceImpl,
    studentDbRepository: StudentDbInterface,
    studentDbRepositoryImpl: StudentRepositoryMongoDB,
    // instructorDbRepository: InstructorDbInterface,
    // instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
    // googleAuthServiceInterface: GoogleAuthServiceInterface,
    // googleAuthServiceImpl: GoogleAuthService,
    // adminDbRepository: AdminDbInterface,
    // adminDbRepositoryImpl: AdminRepositoryMongoDb,
    refreshTokenDbRepository: RefreshTokenDbInterface,
    refreshTokenDbRepositoryImpl: RefreshTokenRepositoryMongoDb,
) => {
    const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl());

    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenDbRepositoryImpl());

    const authService = authServiceInterface(authServiceImpl());

    // ? STUDENT
    const registerStudent = asyncHandler(async (req: Request, res: Response) => {
        const student: StudentRegisterInterface = req.body;
        const { accessToken, refreshToken } = await studentRegister(
            student,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'Successfully registered',
            accessToken,
            refreshToken,
        });
    });

    return {
        registerStudent,
    };
};

export default authController;
