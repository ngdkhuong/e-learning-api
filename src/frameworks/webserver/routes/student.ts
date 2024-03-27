import express from 'express';
import { RedisClient } from '../../../app';
import { studentDbRepository } from '../../../app/repositories/studentDbRepository';
import { studentRepositoryMongoDB } from './../../database/mongodb/repositories/studentsRepoMongoDb';
import studentController from './../../../controllers/studentController';
import { authService } from '../../../frameworks/services/authService';
import { authServiceInterface } from '../../../app/services/authServiceInterface';
import { contactDbInterface } from './../../../app/repositories/contactRepoInterface';
import { contactRepositoryMongoDb } from './../../database/mongodb/repositories/contactRepoMongoDb';
import { cloudServiceInterface } from './../../../app/services/cloudServiceInterface';
import { cloudinaryService } from './../../services/CloudinaryService';
import { redisCacheRepository } from './../../database/redis/redisCacheRepository';
import { cacheRepositoryInterface } from './../../../app/repositories/cachedRepoInterface';
import jwtAuthMiddleware from '../middlewares/userAuth';
import { cachingMiddleware } from '../middlewares/redisCaching';
import upload from '../middlewares/multer';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';

const studentRouter = (redisClient: RedisClient) => {
    const router = express.Router();

    const controller = studentController(
        authServiceInterface,
        authService,
        studentDbRepository,
        studentRepositoryMongoDB,
        contactDbInterface,
        contactRepositoryMongoDb,
        cloudServiceInterface,
        cloudinaryService,
        cacheRepositoryInterface,
        redisCacheRepository,
        redisClient,
    );

    router.patch('/change-password', controller.changePassword);

    router.put('/update-profile', jwtAuthMiddleware, upload.single('image'), controller.updateProfile);

    router.get('/get-student-details', jwtAuthMiddleware, cachingMiddleware(redisClient), controller.getStudentDetails);

    router.get('/get-all-students', jwtAuthMiddleware, controller.getAllStudents);

    router.patch('/block-student/:studentId', jwtAuthMiddleware, roleCheckMiddleware('admin'), controller.blockStudent);

    router.patch(
        '/unblock-student/:studentId',
        jwtAuthMiddleware,
        roleCheckMiddleware('admin'),
        controller.unblockStudent,
    );

    router.get(
        '/get-all-blocked-students',
        jwtAuthMiddleware,
        roleCheckMiddleware('admin'),
        controller.getAllBlockedStudents,
    );

    router.post('/contact-us', controller.addContact);

    return router;
};

export default studentRouter;
