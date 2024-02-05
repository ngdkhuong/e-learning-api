import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { StudentDbInterface } from '../../repositories/studentsDbRepository';
import { RefreshTokenDbInterface } from '../../repositories/refreshTokenDBRepository';
import { AuthServiceInterface } from '../../services/authServiceInterface';
import { StudentInterface } from '@src/types/studentInterface';

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
