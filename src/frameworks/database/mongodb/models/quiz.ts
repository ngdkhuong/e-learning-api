import { Schema, model } from 'mongoose';

const quizSchema = new Schema(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        lessonId: {
            type: Schema.Types.ObjectId,
            ref: 'lessons',
            required: true,
        },
        questions: [
            {
                question: {
                    type: String,
                    required: true,
                    minLength: 5,
                },
                options: [
                    {
                        option: {
                            type: String,
                            required: true,
                        },
                        isCorrect: {
                            type: Boolean,
                            required: true,
                        },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Quiz = model('Quiz', quizSchema, 'quiz');

export default Quiz;
