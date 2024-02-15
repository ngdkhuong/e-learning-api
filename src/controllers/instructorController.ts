import { InstructorDbInterface } from '@src/app/repositories/instructorDbRepository';
import { AuthServiceInterface } from '@src/app/services/authServiceInterface';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';
import { InstructorRepositoryMongoDb } from '@src/frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { AuthService } from '@src/frameworks/services/authService';
import { CloudServiceImpl } from '@src/frameworks/services/s3CloudService';

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
