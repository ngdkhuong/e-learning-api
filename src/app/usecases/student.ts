import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AuthServiceInterface } from '../services/authServiceInterface';
import { StudentDbInterface, studentDbRepository } from '../repositories/studentsDbRepository';
import AppError from '@src/utils/appError';
import { StudentInterface, StudentUpdateInfo } from '@src/types/studentInterface';

export const changePasswordU = async (
    id: string | undefined,
    password: {
        currentPassword: string;
        newPassword: string;
    },
    authService: ReturnType<AuthServiceInterface>,
    studentDbRepository: ReturnType<StudentDbInterface>,
) => {
    if (!id) {
        throw new AppError('Invalid student', HttpStatusCodes.BAD_REQUEST);
    }
    if (!password.currentPassword) {
        throw new AppError('Please provide current password', HttpStatusCodes.BAD_REQUEST);
    }
    const student: StudentInterface | null = await studentDbRepository.getStudent(id);
    if (!student) {
        throw new AppError('Unauthorized user', HttpStatusCodes.NOT_FOUND);
    }
    const isPasswordCorrect = await authService.comparePassword(password.currentPassword, student?.password);
    if (!isPasswordCorrect) {
        throw new AppError('Sorry, your current password is incorrect.', HttpStatusCodes.BAD_REQUEST);
    }
    if (!password.newPassword) {
        throw new AppError('New password cannot be empty.', HttpStatusCodes.UNAUTHORIZED);
    }
    const hashedPassword = await authService.hashPassword(password.newPassword);
    await studentDbRepository.changePassword(id, hashedPassword);
};

export const updateProfileU = async (
    id: string | undefined,
    studentInfo: StudentUpdateInfo,
    profilePic: Express.Multer.File,
    // cloudService: ReturnType<CloudServiceInterface>,
    studentDbRepository: ReturnType<StudentDbInterface>,
) => {
    if (!id) {
        throw new AppError('Invalid student', HttpStatusCodes.BAD_REQUEST);
    }
    if (Object.keys(studentInfo).length === 0) {
        throw new AppError('At least update a single field', HttpStatusCodes.BAD_REQUEST);
    }
    // if (profilePic) {
    //     const response = await cloudService.upload(profilePic);
    //     studentInfo.profilePic = response;
    // }
    await studentDbRepository.updateProfile(id, studentInfo);
};

export const getStudentDetailsU = async (
    id: string | undefined,
    // cloudService: ReturnType<CloudServiceInterface>,
    studentDbRepository: ReturnType<StudentDbInterface>,
) => {
    if (!id) {
        throw new AppError('Please provide a valid student id', HttpStatusCodes.BAD_REQUEST);
    }
    const studentDetails: StudentInterface | null = await studentDbRepository.getStudent(id);
    // if (studentDetails?.profilePic?.key) {
    //     studentDetails.profilePic.url = await cloudService.getFile(studentDetails.profilePic.key);
    // }
    if (studentDetails) {
        studentDetails.password = 'no password';
    }
    return studentDetails;
};