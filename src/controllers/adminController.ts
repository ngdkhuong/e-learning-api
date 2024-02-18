import { CourseDbRepositoryInterface } from '../app/repositories/courseDbRepository';
import { AdminDbInterface } from '../app/repositories/adminDbRepository';
import { AdminRepositoryMongoDb } from '../frameworks/database/mongodb/repositories/adminRepoMongoDb';
import { CourseRepositoryMongoDbInterface } from '../frameworks/database/mongodb/repositories/courseRepoMongoDb';
import { InstructorDbInterface } from '../app/repositories/instructorDbRepository';
import { InstructorRepositoryMongoDb } from '../frameworks/database/mongodb/repositories/instructorRepoMongoDb';
import { StudentDbInterface } from '../app/repositories/studentsDbRepository';
import { StudentRepositoryMongoDB } from '../frameworks/database/mongodb/repositories/studentsRepoMongoDb';

const adminController = (
    adminDbRepository: AdminDbInterface,
    adminDbRepositoryImpl: AdminRepositoryMongoDb,
    courseDbRepository: CourseDbRepositoryInterface,
    courseDbRepositoryImpl: CourseRepositoryMongoDbInterface,
    instructorDbRepository: InstructorDbInterface,
    instructorDbRepositoryImpl: InstructorRepositoryMongoDb,
    studentDbRepository: StudentDbInterface,
    studentDbRepositoryImpl: StudentRepositoryMongoDB,
    paymentDbRepository: PaymentInterface,
    paymentDbRepositoryImpl: PaymentImplInterface,
    categoryDbRepository: CategoryDbInterface,
    categoryDbRepositoryImpl: CategoryRepoMongoDbInterface,
) => {
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());

    const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());

    const dbRepositoryInstructor = instructorDbRepository(instructorDbRepositoryImpl());

    const dbRepositoryStudent = studentDbRepository(studentDbRepositoryImpl());
};
