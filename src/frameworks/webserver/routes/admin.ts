import express from 'express';
import adminController from '../../../controllers/adminController';
import { adminRepoMongoDb } from '../../../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { adminDbRepository } from '../../../app/repositories/adminDbRepository';
import { courseRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/courseRepoMongoDb';
import { courseDbRepository } from '../../../app/repositories/courseDbRepository';
import { instructorDbRepository } from '../../../app/repositories/instructorDbRepository';
import { instructorRepoMongoDb } from '../../../frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { studentDbRepository } from '../../../app/repositories/studentDbRepository';
import { studentRepositoryMongoDB } from '../../../frameworks/database/mongodb/repositories/studentsRepoMongoDb';
import { paymentInterface } from '../../../app/repositories/paymentDbRepository';
import { paymentRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/paymentRepoMongoDb';
import { categoryDbInterface } from '../../../app/repositories/categoryDbRepository';
import { categoryRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/categoryRepoMongoDb';

const adminRouter = () => {
    const router = express.Router();
    const controller = adminController(
        adminDbRepository,
        adminRepoMongoDb,
        courseDbRepository,
        courseRepositoryMongoDb,
        instructorDbRepository,
        instructorRepoMongoDb,
        studentDbRepository,
        studentRepositoryMongoDB,
        paymentInterface,
        paymentRepositoryMongoDb,
        categoryDbInterface,
        categoryRepositoryMongoDb,
    );

    router.get('/dashboard-details', controller.getDashBoardDetails);

    router.get('/graph-data', controller.getGraphDetails);

    return router;
};

export default adminRouter;
