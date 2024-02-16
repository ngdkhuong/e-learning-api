import { CourseDbRepositoryInterface } from '@src/app/repositories/courseDbRepository';
import { InstructorDbInterface } from '@src/app/repositories/instructorDbRepository';
import { AuthServiceInterface } from '@src/app/services/authServiceInterface';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';
import { SendEmailServiceInterface } from '@src/app/services/sendEmailServiceInterface';
import { CourseRepositoryMongoDbInterface } from '@src/frameworks/database/mongodb/repositories/courseRepoMongoDb';
import { InstructorRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { AuthService } from '@src/frameworks/services/authService';
import { CloudServiceImpl } from '@src/frameworks/services/s3CloudService';
import { SendEmailService } from '@src/frameworks/services/sendEmailService';

const instructorController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    instructorDbRepository: InstructorDbInterface,
    instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
    courseDbRepository: CourseDbRepositoryInterface,
    courseDbRepositoryImpl: CourseRepositoryMongoDbInterface,
    emailServiceInterface: SendEmailServiceInterface,
    emailServiceImpl: SendEmailService,
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudServiceImpl,
) => {
    const authService = authServiceInterface(authServiceImpl());

    const dbRepositoryInstructor = instructorDbRepository(instructorDbRepositoryImpl());

    const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());

    const emailService = emailServiceInterface(emailServiceImpl());

    const cloudService = cloudServiceInterface(cloudServiceImpl());
};
