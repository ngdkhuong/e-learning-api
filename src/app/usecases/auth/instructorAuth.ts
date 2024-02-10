import { InstructorInterface, SavedInstructorInterface } from '../../../types/instructorInterface';
import { InstructorDbInterface } from '../../../app/repositories/instructorDbRepository';
import { AuthServiceInterface } from '../../../app/services/authServiceInterface';
import { RefreshTokenDbInterface } from '@src/app/repositories/refreshTokenDBRepository';
import { UploadFileInterface } from '@src/types/common';
import AppError from '../../../utils/appError';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';
import HttpStatusCodes from './../../../constants/HttpStatusCodes';

export const instructorRegister = async (
    instructor: InstructorInterface,
    files: Express.Multer.File[],
    instructorRepository: ReturnType<InstructorDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
    cloudService: ReturnType<CloudServiceInterface>,
) => {
    console.log(files);
    instructor.certificates = [];
    // Use object destructuring and default value
    const { password = '', email = '' }: InstructorInterface = instructor;
    instructor.email = email.toLowerCase();

    // Check if the email is already registered
    const isEmailAlreadyRegistered = await instructorRepository.getInstructorByEmail(instructor.email);

    if (isEmailAlreadyRegistered) {
        throw new AppError('Instructor with the same email already exists..!', HttpStatusCodes.CONFLICT);
    }

    for (const file of files) {
        let uploadedFile;

        if (file.originalname === 'profilePic') {
            uploadedFile = await cloudService.upload(file);
            instructor.profilePic = uploadedFile;
        } else {
            uploadedFile = await cloudService.upload(file);
            instructor.certificates.push(uploadedFile);
        }
    }

    // Hash the password if provided
    if (password) {
        instructor.password = await authService.hashPassword(password);
    }
    console.log(instructor);

    // Add instructor to repository
    const response = await instructorRepository.addInstructor(instructor);

    return response
        ? { status: true, message: 'Successfully registered' }
        : { status: false, message: 'Failed to register' };
};

export const instructorLogin = async (
    email: string,
    password: string,
    instructorRepository: ReturnType<InstructorDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const instructor: SavedInstructorInterface | null = await instructorRepository.getInstructorByEmail(email);

    if (!instructor) {
        throw new AppError("Instructor doesn't exist, please register", HttpStatusCodes.NOT_FOUND);
    }

    if (!instructor.isVerified) {
        throw new AppError('Your details is under verification, please try again later', HttpStatusCodes.UNAUTHORIZED);
    }

    const isPasswordCorrect = await authService.comparePassword(password, instructor.password);

    if (!isPasswordCorrect) {
        throw new AppError('Your password is incorrect, please try again', HttpStatusCodes.UNAUTHORIZED);
    }

    const payload = {
        Id: instructor._id,
        email: instructor.email,
        role: 'instructor',
    };

    await refreshTokenRepository.deleteRefreshToken(instructor._id);

    const accessToken = authService.generateToken(payload);

    const refreshToken = authService.generateRefreshToken(payload);

    const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);

    await refreshTokenRepository.saveRefreshToken(instructor._id, refreshToken, expirationDate);

    return {
        accessToken,
        refreshToken,
    };
};
