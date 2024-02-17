import express from 'express';
import instructorController from '../../../controllers/instructorController';
import { authServiceInterface } from '../../../app/services/authServiceInterface';
import { authService } from '../../../frameworks/services/authService';
import { instructorDbRepository } from '../../../app/repositories/instructorDbRepository';
import { instructorRepoMongoDb } from '../../../frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { courseDbRepository } from '../../../app/repositories/courseDbRepository';
import { courseRepositoryMongoDb } from '../../../frameworks/database/mongodb/repositories/courseRepoMongoDb';
import { sendEmailServiceInterface } from '../../../app/services/sendEmailServiceInterface';
import { sendEmailService } from '../../../frameworks/services/sendEmailService';
import { cloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import { s3Service } from '../../../frameworks/services/s3CloudService';
import jwtAuthMiddleware from '../middlewares/userAuth';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';
import upload from '../middlewares/multer';

const instructorRouter = () => {
    const router = express.Router();
    const controller = instructorController(
        authServiceInterface,
        authService,
        instructorDbRepository,
        instructorRepoMongoDb,
        courseDbRepository,
        courseRepositoryMongoDb,
        sendEmailServiceInterface,
        sendEmailService,
        cloudServiceInterface,
        s3Service,
    );

    // * Instructor management
    router.get('/view-instructor-requests', controller.getInstructorRequests);

    router.patch('/accept-instructor-request/:instructorId', controller.verifyInstructor);

    router.put('/reject-instructor-request', controller.rejectRequest);

    router.get('/get-all-instructors', controller.getAllInstructor);

    router.patch('/get-all-instructors/block-instructors', controller.blockInstructor);

    router.patch('/get-all-instructors/unblock-instructors/:instructorId', controller.unblockInstructor);

    router.get('/get-blocked-instructors', controller.getBlockedInstructor);

    router.get('/view-instructor/:instructorId', controller.getInstructorById);

    router.get(
        '/get-instructor-details',
        jwtAuthMiddleware,
        roleCheckMiddleware('instructor'),
        controller.getInstructorDetails,
    );

    router.put(
        '/update-profile',
        jwtAuthMiddleware,
        upload.single('image'),
        roleCheckMiddleware('instructor'),
        controller.updateProfile,
    );

    router.patch('/change-password', jwtAuthMiddleware, roleCheckMiddleware('instructor'), controller.changePassword);

    router.get('/get-students-by-instructor', jwtAuthMiddleware, controller.getStudentsForInstructors);

    return router;
};

export default instructorRouter;
