import express from 'express';
import authController from '../../../controllers/authController';
import { authServiceInterface } from './../../../app/services/authServiceInterface';
import { authService } from './../../services/authService';
import { studentRepositoryMongoDB } from './../../database/mongodb/repositories/studentsRepoMongoDb';
import { studentDbRepository } from '../../../app/repositories/studentsDbRepository';
import { refreshTokenDbRepository } from '../../../app/repositories/refreshTokenDBRepository';
import { refreshTokenRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { googleAuthServiceInterface } from './../../../app/services/googleAuthServiceInterface';
import { googleAuthService } from './../../services/googleAuthService';

const authRouter = () => {
    const router = express.Router();

    const controller = authController(
        authServiceInterface,
        authService,
        // cloudServiceInterface ,
        // cloudServiceImpl ,
        studentDbRepository,
        studentRepositoryMongoDB,
        // instructorDbRepository ,
        // instructorDbRepositoryImpl ,
        googleAuthServiceInterface,
        googleAuthService,
        // adminDbRepository ,
        // adminDbRepositoryImpl ,
        refreshTokenDbRepository,
        refreshTokenRepositoryMongoDB,
    );

    // * Student
    router.post('/student-register', controller.registerStudent);
    router.post('/student-login', controller.loginStudent);
    router.post('/login-with-google', controller.loginWithGoogle);

    return router;
};

export default authRouter;
