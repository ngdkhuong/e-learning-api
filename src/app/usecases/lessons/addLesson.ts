import { CreateLessonInterface } from '../../../types/lesson';
import { CloudServiceInterface } from '../../../app/services/cloudServiceInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { LessonDbRepositoryInterface } from '../../../app/repositories/lessonDbRepository';
import { QuizDbInterface } from '../../../app/repositories/quizDbRepository';
import AppError from '../../../utils/appError';
import * as fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import * as ffprobePath from 'ffprobe-static';

export const addLessonsU = async (
    media: Express.Multer.File[] | undefined,
    courseId: string | undefined,
    instructorId: string | undefined,
    lesson: CreateLessonInterface,
    lessonDbRepository: ReturnType<LessonDbRepositoryInterface>,
    cloudService: ReturnType<CloudServiceInterface>,
    quizDbRepository: ReturnType<QuizDbInterface>,
) => {
    if (!courseId) {
        throw new AppError('Please provide a course id', HttpStatusCodes.BAD_REQUEST);
    }

    if (!instructorId) {
        throw new AppError('Please provide a instructor id', HttpStatusCodes.BAD_REQUEST);
    }

    if (!lesson) {
        throw new AppError('Data is not provided', HttpStatusCodes.BAD_REQUEST);
    }

    if (media) {
        const videoFile = media[0];
        const tempFilePath = './temp_video.mp4';
        /* `fs.writeFileSync(tempFilePath, videoFile.buffer);` is writing the contents of the video
        file buffer to a file located at the specified `tempFilePath`. This operation synchronously
        writes the buffer data to the file, creating the file if it does not exist or overwriting it
        if it already exists. */
        fs.writeFileSync(tempFilePath, videoFile.buffer);

        const getVideoDuration = () =>
            new Promise<string>((resolve, reject) => {
                ffmpeg(tempFilePath)
                    .setFfprobePath(ffprobePath.path)
                    .ffprobe((err: Error | null, data: any) => {
                        fs.unlinkSync(tempFilePath);

                        if (err) {
                            console.error('Error while probing the video:', err);
                            reject(err);
                        }

                        const duration: string = data.format.duration;

                        resolve(duration);
                    });
            });

        try {
            const videoDuration = await getVideoDuration();
            lesson.duration = parseFloat(videoDuration);
        } catch (error) {
            console.error('Error while getting video duration:', error);
        }
    }

    if (media) {
        lesson.media = await Promise.all(media.map(async (files) => await cloudService.upload(files)));
    }

    const lessonId = await lessonDbRepository.addLesson(courseId, instructorId, lesson);

    if (!lessonId) {
        throw new AppError('Data is not provided', HttpStatusCodes.BAD_REQUEST);
    }

    const quiz = {
        courseId,
        lessonId: lessonId.toString(),
        questions: lesson.questions,
    };

    await quizDbRepository.addQuiz(quiz);
};
