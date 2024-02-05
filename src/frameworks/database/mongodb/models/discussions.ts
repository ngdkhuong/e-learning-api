import { Schema, model } from 'mongoose';

const replySchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const discussionsSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'students',
        },
        message: {
            type: String,
            required: true,
        },
        lessonId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        replies: [replySchema],
    },
    {
        timestamps: true,
    },
);

const Discussions = model('Discussions', discussionsSchema, 'discussions');

export default Discussions;
