import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthServiceInterface } from '../app/services/authServiceInterface';
import { AuthService } from '../frameworks/services/authService';
import { StudentDbInterface } from '../app/repositories/studentsDbRepository';
import { StudentRepositoryMongoDB } from './../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { studentLogin, studentRegister, signInWithGoogle } from '../app/usecases/auth/studentAuth';
import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';
import { RefreshTokenDbInterface } from '@src/app/repositories/refreshTokenDBRepository';
import { RefreshTokenRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { GoogleAuthServiceInterface } from '@src/app/services/googleAuthServiceInterface';
import { GoogleAuthService } from '@src/frameworks/services/googleAuthService';

const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    // cloudServiceInterface: CloudServiceInterface,
    // cloudServiceImpl: CloudServiceImpl,
    studentDbRepository: StudentDbInterface,
    studentDbRepositoryImpl: StudentRepositoryMongoDB,
    // instructorDbRepository: InstructorDbInterface,
    // instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
    googleAuthServiceInterface: GoogleAuthServiceInterface,
    googleAuthServiceImpl: GoogleAuthService,
    // adminDbRepository: AdminDbInterface,
    // adminDbRepositoryImpl: AdminRepositoryMongoDb,
    refreshTokenDbRepository: RefreshTokenDbInterface,
    refreshTokenDbRepositoryImpl: RefreshTokenRepositoryMongoDb,
) => {
    const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl());

    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenDbRepositoryImpl());

    const authService = authServiceInterface(authServiceImpl());

    const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());

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

    const loginStudent = asyncHandler(async (req: Request, res: Response) => {
        const { email, password }: { email: string; password: string } = req.body;
        const { accessToken, refreshToken } = await studentLogin(
            email,
            password,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            accessToken,
            refreshToken,
        });
    });

    const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
        const { credential }: { credential: string } = req.body;
        const { accessToken, refreshToken } = await signInWithGoogle(
            credential,
            googleAuthService,
            dbRepositoryUser,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in with google',
            accessToken,
            refreshToken,
        });
    });

    return {
        registerStudent,
        loginStudent,
        loginWithGoogle,
    };
};

export default authController;
