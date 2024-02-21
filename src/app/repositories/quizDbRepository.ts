import { QuizRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/quizDbRepository';
import { AddQuizInfoInterface, EditQuizInfoInterface } from '../../types/courseInterface';

export const quizDbRepository = (repository: ReturnType<QuizRepositoryMongoDbInterface>) => {
    const addQuiz = async (quiz: AddQuizInfoInterface) => await repository.addQuiz(quiz);

    const editQuiz = async (lessonId: string, quiz: EditQuizInfoInterface) => await repository.editQuiz(lessonId, quiz);

    const getQuizByLessonId = async (lessonId: string) => await repository.getQuizByLessonId(lessonId);

    return {
        addQuiz,
        editQuiz,
        getQuizByLessonId,
    };
};

export type QuizDbInterface = typeof quizDbRepository;
