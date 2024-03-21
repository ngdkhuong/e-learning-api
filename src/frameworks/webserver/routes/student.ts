import express from 'express';
import { RedisClient } from '../../../app';
import { studentDbRepository } from '../../../app/repositories/studentDbRepository';
import { studentRepositoryMongoDB } from './../../database/mongodb/repositories/studentsRepoMongoDb';
import studentController from './../../../controllers/studentController';
import { authService } from '../../../frameworks/services/authService';
import { authServiceInterface } from '../../../app/services/authServiceInterface';

const studentRouter = (redisClient: RedisClient) => {
    const router = express.Router();

    const controller = studentController(
        authServiceInterface,
        authService,
        studentDbRepository,
        studentRepositoryMongoDB,
        // contactDbRepository,
        // contactDbRepositoryImpl,
        // cloudServiceInterface,
        // cloudServiceImpl,
        // cacheDbRepository,
        // cacheDbRepositoryImpl,
        // cacheClient,
    );

    router.patch('/change-password', controller.changePassword);

    return router;
};

export default studentRouter;
