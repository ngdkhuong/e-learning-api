import { Schema, model } from 'mongoose';

const mediaSchema = new Schema({
    key: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
});

const lessonSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        contents: {
            type: Array<string>,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
            default: 0,
        },
        instructorId: {
            type: Schema.Types.ObjectId,
            ref: 'instructor',
            required: true,
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'course',
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        media: {
            type: [mediaSchema],
        },
    },
    {
        timestamps: true,
    },
);

const Lessons = model('Lesson', lessonSchema, 'lessons');

export default Lessons;
