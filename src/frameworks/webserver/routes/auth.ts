import express from 'express';
import authController from '../../../controllers/authController';
import { authServiceInterface } from './../../../app/services/authServiceInterface';
import { authService } from './../../services/authService';
import { studentRepositoryMongoDB } from './../../database/mongodb/repositories/studentsRepoMongoDb';
import { studentDbRepository } from '../../../app/repositories/studentsDbRepository';
import { refreshTokenDbRepository } from '../../../app/repositories/refreshTokenDBRepository';
import { refreshTokenRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';

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
        // googleAuthServiceInterface ,
        // googleAuthServiceImpl ,
        // adminDbRepository ,
        // adminDbRepositoryImpl ,
        refreshTokenDbRepository,
        refreshTokenRepositoryMongoDB,
    );

    // * Student
    router.post('/student-register', controller.registerStudent);

    return router;
};

export default authRouter;
