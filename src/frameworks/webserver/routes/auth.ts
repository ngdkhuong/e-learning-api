import express from 'express';
import authController from '../../../controllers/authController';
import { authServiceInterface } from './../../../app/services/authServiceInterface';
import { authService } from './../../services/authService';
import { studentRepositoryMongoDB } from './../../database/mongodb/repositories/studentsRepoMongoDb';
import { studentDbRepository } from '@src/app/repositories/studentsDbRepository';

const authRouter = () => {
    const router = express.Router();

    const controller = authController(authServiceInterface, authService, studentDbRepository, studentRepositoryMongoDB);

    // * Student
    router.post('/student-register', controller.registerStudent);
};
