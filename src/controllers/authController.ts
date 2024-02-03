import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthServiceInterface } from '../app/services/authServiceInterface';
import { AuthService } from '../frameworks/services/authService';
import { StudentDbInterface } from '../app/repositories/studentsDbRepository';
import { StudentRepositoryMongoDB } from './../frameworks/database/mongodb/repositories/studentsRepoMongoDb';

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
    // refreshTokenDbRepository: RefreshTokenDbInterface,
    // refreshTokenDbRepositoryImpl: RefreshTokenRepositoryMongoDb,
) => {
    const authService = authServiceInterface(authServiceImpl());
};

export default authController;
