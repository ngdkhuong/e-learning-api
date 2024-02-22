import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { QuizDbInterface } from '../../../app/repositories/quizDbRepository';
import AppError from './../../../utils/appError';
import { QuizInterface } from './../../../types/quiz';
import { shuffleQuiz } from './../../helper/shuffle';

export const getQuizzesLessonU = async (lessonId: string, quizDbRepository: ReturnType<QuizDbInterface>) => {
    if (!lessonId) {
        throw new AppError('Lesson id not found', HttpStatusCodes.BAD_REQUEST);
    }
    const quizzes: QuizInterface | null = await quizDbRepository.getQuizByLessonId(lessonId);
    return shuffleQuiz(quizzes);
};
