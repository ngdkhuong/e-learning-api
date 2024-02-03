import { StudentRegisterInterface } from '@src/types/studentRegisterInterface';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import AppError from '@src/utils/appError';
import { StudentDbInterface } from '../../repositories/studentsDbRepository';
import { RefreshTokenDbInterface } from '../../repositories/refreshTokenDBRepository';
import { AuthServiceInterface } from '../../services/authServiceInterface';

export const studentRegister = async (
    student: StudentRegisterInterface,
    studentRepository: ReturnType<StudentDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {};
