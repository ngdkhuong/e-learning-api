import express from 'express';
import authController from '../../../controllers/authController';
import { authServiceInterface } from './../../../app/services/authServiceInterface';
import { authService } from './../../services/authService';
import { studentRepositoryMongoDB } from './../../database/mongodb/repositories/studentsRepoMongoDb';
import { studentDbRepository } from '../../../app/repositories/studentDbRepository';
import { refreshTokenDbRepository } from '../../../app/repositories/refreshTokenDBRepository';
import { refreshTokenRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { googleAuthServiceInterface } from './../../../app/services/googleAuthServiceInterface';
import { googleAuthService } from './../../services/googleAuthService';
import { cloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import { s3Service } from '../../../frameworks/services/s3CloudService';
import { instructorDbRepository } from '../../../app/repositories/instructorDbRepository';
import { instructorRepoMongoDb } from '../../../frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { adminRepoMongoDb } from '../../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { adminDbRepository } from '../../../app/repositories/adminDbRepository';
import upload from '../middlewares/multer';

const authRouter = () => {
    const router = express.Router();

    const controller = authController(
        authServiceInterface,
        authService,
        cloudServiceInterface,
        s3Service,
        studentDbRepository,
        studentRepositoryMongoDB,
        instructorDbRepository,
        instructorRepoMongoDb,
        googleAuthServiceInterface,
        googleAuthService,
        adminDbRepository,
        adminRepoMongoDb,
        refreshTokenDbRepository,
        refreshTokenRepositoryMongoDB,
    );

    // * Student
    router.post('/student-register', controller.registerStudent);
    router.post('/student-login', controller.loginStudent);
    router.post('/login-with-google', controller.loginWithGoogle);

    // * Instructor
    router.post('/instructor/instructor-register', upload.array('images'), controller.registerInstructor);
    router.post('/instructor/instructor-login', controller.loginInstructor);

    // * Admin
    router.post('/admin/admin-login', controller.loginAdmin);

    return router;
};

export default authRouter;
