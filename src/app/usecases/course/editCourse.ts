import AppError from '../../../utils/appError';
import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';
import { CloudServiceInterface } from '../../services/cloudServiceInterface';
import { EditCourseInfo } from '../../../types/courseInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';

export const editCourseU = async (
    courseId: string,
    instructorId: string | undefined,
    files: Express.Multer.File[],
    courseInfo: EditCourseInfo,
    cloudService: ReturnType<CloudServiceInterface>,
    courseDbRepository: ReturnType<CourseDbRepositoryInterface>,
) => {
    let isThumbnailUpdated = false,
        isGuideLinesUpdated = false;

    if (!courseId) {
        throw new AppError('Please provide course id', HttpStatusCodes.BAD_REQUEST);
    }

    if (!instructorId) {
        throw new AppError('Please provide instructor id', HttpStatusCodes.BAD_REQUEST);
    }

    if (!courseInfo) {
        throw new AppError('Please provide course details', HttpStatusCodes.BAD_REQUEST);
    }

    if (files && files.length > 0) {
        const uploadPromises = files.map(async (file) => {
            let uploadedFile;

            if (file.mimetype === 'application/pdf') {
                uploadedFile = await cloudService.upload(file);
                courseInfo.guidelines = {
                    key: uploadedFile.key,
                    url: uploadedFile.url,
                };
                isGuideLinesUpdated = true;
            } else {
                uploadedFile = await cloudService.upload(file);
                courseInfo.thumbnail = {
                    key: uploadedFile.key,
                    url: uploadedFile.url,
                };
                isThumbnailUpdated = true;
            }
        });

        await Promise.all(uploadPromises);
    }

    courseInfo.instructorId = instructorId;

    if (typeof courseInfo.tags === 'string') {
        courseInfo.tags = courseInfo.tags.split(',');
    }

    if (typeof courseInfo.syllabus === 'string') {
        courseInfo.syllabus = courseInfo.syllabus.split(',');
    }

    if (typeof courseInfo.requirements === 'string') {
        courseInfo.requirements = courseInfo.requirements.split(',');
    }

    const oldCourse = await courseDbRepository.getCourseById(courseId);

    const response = await courseDbRepository.editCourse(courseId, courseInfo);

    if (response) {
        if (isGuideLinesUpdated && oldCourse?.guidelines) {
            await cloudService.removeFile(oldCourse?.guidelines.key);
        }
        if (isThumbnailUpdated && oldCourse?.thumbnail) {
            await cloudService.removeFile(oldCourse?.thumbnail.key);
        }
    }
};
