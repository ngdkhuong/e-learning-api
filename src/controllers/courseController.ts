import { CustomRequest } from '../types/customRequest';
import { RedisClient } from '../app';
import { CacheRepositoryInterface } from '../app/repositories/cachedRepoInterface';
import { CourseDbRepositoryInterface } from '../app/repositories/courseDbRepository';
import { CloudServiceInterface } from '../app/services/cloudServiceInterface';
import { CourseRepositoryMongoDbInterface } from '../frameworks/database/mongodb/repositories/courseRepoMongoDb';
import { RedisRepositoryImpl } from '../frameworks/database/redis/redisCacheRepository';
import { CloudServiceImpl } from '../frameworks/services/s3CloudService';
import { NextFunction, Response } from 'express';
import { AddCourseInfoInterface } from '../types/courseInterface';

const courseController = (
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudServiceImpl,
    courseDbRepository: CourseDbRepositoryInterface,
    courseDbRepositoryImpl: CourseRepositoryMongoDbInterface,
    quizDbRepository: QuizDbInterface,
    quizDbRepositoryImpl: QuizRepositoryMongoDbInterface,
    lessonDbRepository: LessonDbRepositoryInterface,
    lessonDbRepositoryImpl: LessonRepositoryMongoDbInterface,
    discussionDbRepository: DiscussionDbInterface,
    discussionDbRepositoryImpl: DiscussionRepoMongoDbInterface,
    paymentDbRepository: PaymentInterface,
    paymentDbRepositoryImpl: PaymentImplInterface,
    cacheDbRepository: CacheRepositoryInterface,
    cacheDbRepositoryImpl: RedisRepositoryImpl,
    cacheClient: RedisClient,
) => {
    const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());

    const cloudService = cloudServiceInterface(cloudServiceImpl());

    const dbRepositoryQuiz = quizDbRepository(quizDbRepositoryImpl());

    const dbRepositoryLesson = lessonDbRepository(lessonDbRepositoryImpl());

    const dbRepositoryDiscussion = discussionDbRepository(discussionDbRepositoryImpl());

    const dbRepositoryPayment = paymentDbRepository(paymentDbRepositoryImpl());

    const dbRepositoryCache = cacheDbRepository(cacheDbRepositoryImpl(cacheClient));

    const addCourse = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
        const course: AddCourseInfoInterface = req.body;
        const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        const instructorId = req.user?.Id;
        const response = await addCourses();
    });
};
