import { StudentRegisterInterface } from '../../../types/studentRegisterInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { StudentDbInterface } from '../../repositories/studentDbRepository';
import { RefreshTokenDbInterface } from '../../repositories/refreshTokenDBRepository';
import { AuthServiceInterface } from '../../services/authServiceInterface';
import { StudentInterface } from '../../../types/studentInterface';
import { GoogleAuthServiceInterface } from '../../../app/services/googleAuthServiceInterface';

export const studentRegister = async (
    student: StudentRegisterInterface,
    studentRepository: ReturnType<StudentDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    student.email = student?.email?.toLowerCase();
    const isEmailAlreadyRegistered = await studentRepository.getStudentByEmail(student.email);

    if (isEmailAlreadyRegistered) {
        throw new AppError('User with same email already exists...!', HttpStatusCodes.CONFLICT);
    }

    if (student.password) {
        student.password = await authService.hashPassword(student.password);
    }

    if (student.interests) {
        const interests: Array<string> = [];
        student.interests.map((interest: any) => interests.push(interest.label));
        student.interests = interests;
    }

    const { _id: studentId, email } = await studentRepository.addStudent(student);

    const payload = {
        Id: studentId,
        email,
        role: 'student',
    };

    const accessToken = authService.generateToken(payload);

    const refreshToken = authService.generateRefreshToken(payload);

    const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);

    await refreshTokenRepository.saveRefreshToken(studentId, refreshToken, expirationDate);

    return { accessToken, refreshToken };
};

export const studentLogin = async (
    email: string,
    password: string,
    studentRepository: ReturnType<StudentDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const student: StudentInterface | null = await studentRepository.getStudentByEmail(email);

    if (!student) {
        throw new AppError("This user doesn't exists", HttpStatusCodes.NOT_FOUND);
    }

    const isPasswordCorrect = await authService.comparePassword(password, student.password);

    if (!isPasswordCorrect) {
        throw new AppError('Sorry, your password is incorrect. Please try again.', HttpStatusCodes.UNAUTHORIZED);
    }

    const payload = {
        Id: student._id,
        email: student.email,
        role: 'student',
    };

    await refreshTokenRepository.deleteRefreshToken(student._id);

    const accessToken = authService.generateToken(payload);

    const refreshToken = await authService.generateRefreshToken(payload);

    const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);

    await refreshTokenRepository.saveRefreshToken(student._id, refreshToken, expirationDate);

    return { accessToken, refreshToken };
};

export const signInWithGoogle = async (
    credential: string,
    googleAuthService: ReturnType<GoogleAuthServiceInterface>,
    studentRepository: ReturnType<StudentDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const user = await googleAuthService.verify(credential);

    const isUserExist = await studentRepository.getStudentByEmail(user.email);

    if (isUserExist) {
        const payload = {
            Id: isUserExist._id,
            email: isUserExist.email,
            role: 'student',
        };

        await refreshTokenRepository.deleteRefreshToken(isUserExist._id);

        const accessToken = authService.generateToken(payload);

        const refreshToken = authService.generateRefreshToken(payload);

        const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);

        await refreshTokenRepository.saveRefreshToken(isUserExist._id, refreshToken, expirationDate);

        return { accessToken, refreshToken };
    } else {
        const { _id: userId, email } = await studentRepository.addStudent(user);

        const payload = { Id: userId, email, role: 'student' };

        const accessToken = authService.generateToken(payload);

        const refreshToken = authService.generateRefreshToken(payload);

        const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);

        await refreshTokenRepository.saveRefreshToken(userId, refreshToken, expirationDate);

        return { accessToken, refreshToken };
    }
};
