import { InstructorDbInterface } from '../../../app/repositories/instructorDbRepository';
import { RefreshTokenDbInterface } from '../../../app/repositories/refreshTokenDBRepository';
import { StudentDbInterface } from '../../../app/repositories/studentDbRepository';
import { AuthServiceInterface } from '../../../app/services/authServiceInterface';
import { GoogleAuthServiceInterface } from '../../../app/services/googleAuthServiceInterface';

export const signInWithGoogle = async (
    credential: string,
    role: 'student' | 'instructor', // Specify the allowed roles
    googleAuthService: ReturnType<GoogleAuthServiceInterface>,
    studentRepository: ReturnType<StudentDbInterface>,
    instructorRepository: ReturnType<InstructorDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const user = await googleAuthService.verify(credential);

    let isUserExist;

    if (role === 'student') {
        isUserExist = await studentRepository.getStudentByEmail(user.email);
    } else if (role === 'instructor') {
        isUserExist = await instructorRepository.getInstructorByEmail(user.email);
    }

    if (isUserExist) {
        const payload = {
            Id: isUserExist._id,
            email: isUserExist.email,
            role: role,
        };

        await refreshTokenRepository.deleteRefreshToken(isUserExist._id);

        const accessToken = authService.generateToken(payload);

        const refreshToken = authService.generateRefreshToken(payload);

        const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);

        await refreshTokenRepository.saveRefreshToken(isUserExist._id, refreshToken, expirationDate);

        return { accessToken, refreshToken };
    } else {
        let userId;

        if (role === 'student') {
            const { _id: studentId, email } = await studentRepository.addStudent(user);
            userId = studentId;
        } else if (role === 'instructor') {
            const { _id: instructorId, email } = await instructorRepository.addInstructor(user);
            userId = instructorId;
        }

        const payload = { Id: userId, email, role: role };

        const accessToken = authService.generateToken(payload);

        const refreshToken = authService.generateRefreshToken(payload);

        const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);

        await refreshTokenRepository.saveRefreshToken(userId, refreshToken, expirationDate);

        return { accessToken, refreshToken };
    }
};
