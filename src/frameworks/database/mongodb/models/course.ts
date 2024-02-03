import mongoose, { Schema, model } from 'mongoose';
import { AddCourseInfoInterface } from '../../../../types/courseInterface.ts';

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
});

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 100,
        },
        instructorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        price: {
            type: Number,
            required: function (this: AddCourseInfoInterface) {
                return this.isPaid;
            },
            min: 0,
        },
        isPaid: {
            type: Boolean,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 10,
        },
        syllabus: {
            type: [String],
            required: true,
        },
        requirements: {
            type: [String],
        },
        thumbnail: {
            type: fileSchema,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            default: '',
        },
        guidelines: {
            type: fileSchema,
            required: true,
        },
        guidelinesUrl: {
            type: String,
            default: '',
        },
        introduction: {
            type: fileSchema,
            required: true,
        },
        coursesEnrolled: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'students',
            },
        ],
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        completionStatus: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

const Course = model('Course', courseSchema, 'course');

export default Course;
