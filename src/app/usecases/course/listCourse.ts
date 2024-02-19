import AppError from '../../../utils/appError';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';
import { CourseInterface } from '../../../types/courseInterface';
import { CloudServiceInterface } from '../../../app/services/cloudServiceInterface';

export const getAllCourseU = async (
    cloudService: ReturnType<CloudServiceInterface>,
    courseDbRepository: ReturnType<CourseDbRepositoryInterface>,
) => {
    const courses: CourseInterface[] | null = await courseDbRepository.getAllCourse();

    await Promise.all(
        courses.map(async (course) => {
            if (course.thumbnail) {
                course.thumbnailUrl = await cloudService.getFile(course.thumbnail.key);
            }
        }),
    );

    return courses;
};

export const getCourseByIdU = async (
    courseId: string,
    cloudService: ReturnType<CloudServiceInterface>,
    courseDbRepository: ReturnType<CourseDbRepositoryInterface>,
) => {
    if (!courseId) {
        throw new AppError('Please provide a course id', HttpStatusCodes.BAD_REQUEST);
    }

    const course: CourseInterface | null = await courseDbRepository.getCourseById(courseId);

    if (course) {
        if (course.thumbnail) {
            const thumbnail = await cloudService.getFile(course.thumbnail.key);
            course.thumbnailUrl = thumbnail;
        }
        if (course.guidelines) {
            const guidelines = await cloudService.getFile(course.guidelines.key);
            course.guidelinesUrl = guidelines;
        }
    }

    return course;
};

export const getCourseByStudentU = async (
    studentId: string | undefined,
    cloudService: ReturnType<CloudServiceInterface>,
    courseDbRepository: ReturnType<CourseDbRepositoryInterface>,
) => {
    if (!studentId) {
        throw new AppError('Invalid student id', HttpStatusCodes.BAD_REQUEST);
    }

    const courses = await courseDbRepository.getCourseByStudent(studentId);

    await Promise.all(
        courses.map(async (course) => {
            if (course.thumbnail) {
                course.thumbnailUrl = await cloudService.getFile(course.thumbnail.key);
            }
        }),
    );

    return courses;
};
