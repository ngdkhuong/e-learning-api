import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthServiceInterface } from '../app/services/authServiceInterface';
import { AuthService } from '../frameworks/services/authService';
import { StudentDbInterface } from '../app/repositories/studentDbRepository';
import { StudentRepositoryMongoDB } from './../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { studentLogin, studentRegister, signInWithGoogle } from '../app/usecases/auth/studentAuth';
import { StudentRegisterInterface } from '../types/studentRegisterInterface';
import { RefreshTokenDbInterface } from '../app/repositories/refreshTokenDBRepository';
import { RefreshTokenRepositoryMongoDb } from '../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { GoogleAuthServiceInterface } from '../app/services/googleAuthServiceInterface';
import { GoogleAuthService } from '../frameworks/services/googleAuthService';
import { InstructorDbInterface } from '../app/repositories/instructorDbRepository';
import { InstructorRepositoryMongoDb } from '../frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { InstructorInterface } from '../types/instructorInterface';
import { instructorLogin, instructorRegister } from '../app/usecases/auth/instructorAuth';
import { CloudServiceInterface } from '../app/services/cloudServiceInterface';
import { CloudServiceImpl } from '../frameworks/services/CloudinaryService';
import { adminLogin } from '../app/usecases/auth/adminAuth';
import { AdminDbInterface } from '../app/repositories/adminDbRepository';
import { AdminRepositoryMongoDb } from '../frameworks/database/mongodb/repositories/adminRepoMongoDb';

const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudServiceImpl,
    studentDbRepository: StudentDbInterface,
    studentDbRepositoryImpl: StudentRepositoryMongoDB,
    instructorDbRepository: InstructorDbInterface,
    instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
    googleAuthServiceInterface: GoogleAuthServiceInterface,
    googleAuthServiceImpl: GoogleAuthService,
    adminDbRepository: AdminDbInterface,
    adminDbRepositoryImpl: AdminRepositoryMongoDb,
    refreshTokenDbRepository: RefreshTokenDbInterface,
    refreshTokenDbRepositoryImpl: RefreshTokenRepositoryMongoDb,
) => {
    const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl());

    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenDbRepositoryImpl());

    const dbRepositoryInstructor = instructorDbRepository(instructorDbRepositoryImpl());

    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());

    const authService = authServiceInterface(authServiceImpl());

    const cloudService = cloudServiceInterface(cloudServiceImpl());

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

    // ? INSTRUCTOR
    const registerInstructor = asyncHandler(async (req: Request, res: Response) => {
        const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        const instructor: InstructorInterface = req.body;
        await instructorRegister(instructor, files, dbRepositoryInstructor, authService, cloudService);
        res.status(200).json({
            status: 'success',
            message:
                'Your registration is pending verification by the administrators. You will receive an email once your registration is approved',
        });
    });

    const loginInstructor = asyncHandler(async (req: Request, res: Response) => {
        const { email, password }: { email: string; password: string } = req.body;
        const { accessToken, refreshToken } = await instructorLogin(
            email,
            password,
            dbRepositoryInstructor,
            dbRepositoryRefreshToken,
            authService,
        );
        res.status(200).json({
            status: 'success',
            message: 'Instructor logged in successfully',
            accessToken,
            refreshToken,
        });
    });

    // ? ADMIN
    const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
        const { email, password }: { email: string; password: string } = req.body;

        const { accessToken, refreshToken } = await adminLogin(
            email,
            password,
            dbRepositoryAdmin,
            dbRepositoryRefreshToken,
            authService,
        );

        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in',
            accessToken,
            refreshToken,
        });
    });

    return {
        registerStudent,
        loginStudent,
        loginWithGoogle,
        registerInstructor,
        loginInstructor,
        loginAdmin,
    };
};

export default authController;
