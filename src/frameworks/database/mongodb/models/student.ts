import mongoose, { Schema, model, Document } from 'mongoose';

interface ProfilePic {
    name: string;
    key?: string;
    url?: string;
}

interface IStudent extends Document {
    firstName: string;
    lastName: string;
    profilePic: ProfilePic;
    email: string;
    mobile?: string;
    password?: string;
    interests: Array<string>;
    coursesEnrolled: mongoose.Schema.Types.ObjectId[];
    dateJoined: Date;
    isGoogleUser: boolean;
    isBlocked: boolean;
    blockedReason: string;
}

const ProfileSchema = new Schema<ProfilePic>({
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

const studentSchema = new Schema<IStudent>(
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
            required: function (this: IStudent) {
                return !this.isGoogleUser; //* required for non-Google users
            },
            trim: true,
            sparse: true, //* Allow multiple null values
            match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
        },
        profilePic: {
            type: ProfileSchema,
            required: false,
        },
        interests: {
            type: [String],
            required: true,
            default: [],
        },
        password: {
            type: String,
            required: function (this: IStudent) {
                return !this.isGoogleUser;
            },
            minlength: 8,
        },
        dateJoined: {
            type: Date,
            default: Date.now,
        },
        isGoogleUser: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        blockedReason: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

const Students = model<IStudent>('Students', studentSchema, 'students');

export default Students;
