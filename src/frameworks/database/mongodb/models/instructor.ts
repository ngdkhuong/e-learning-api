import mongoose, { Schema, model } from 'mongoose';

import { Certificate } from '@src/types/instructorInterface';

interface ProfilePic {
    name: string;
    key?: string;
    url?: string;
}

const profileSchema = new Schema<ProfilePic>({
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
    },
    url: {
        type: String,
    },
});

const instructorSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        },
        mobile: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
        },
        profilePic: {
            type: profileSchema,
            required: false,
        },
        certificates: {
            type: Array<Certificate>,
            required: true,
        },
        qualification: {
            type: String,
            required: true,
        },
        subjects: {
            type: Array<string>,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        experience: {
            type: String,
            required: true,
        },
        skills: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        coursesCreated: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
        ],
        rejected: {
            type: Boolean,
            default: false,
        },
        rejectedReason: {
            type: String,
            default: '',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        blockedReason: {
            type: String,
            default: '',
        },
        dateJoined: {
            type: Date,
            default: Date.now,
        },
        profileUrl: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

const Instructor = model('Instructor', instructorSchema, 'instructor');

export default Instructor;
