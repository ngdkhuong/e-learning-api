import { CreateLessonInterface } from '../../../types/lesson';
import { CloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { LessonDbRepositoryInterface } from '../../../app/repositories/lessonDbRepository';
import { QuizDbInterface } from '../../../app/repositories/quizDbRepository';

export const addLessonU = async (
    media: Express.Multer.File[] | undefined,
    courseId: string | undefined,
    instructorId: string | undefined,
    lesson: CreateLessonInterface,
    lessonDbRepository: ReturnType<LessonDbRepositoryInterface>,
    cloudService: ReturnType<CloudServiceInterface>,
    quizDbRepository: ReturnType<QuizDbInterface>,
) => {};
