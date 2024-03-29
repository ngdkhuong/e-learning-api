import { AdminDbInterface } from '../../../app/repositories/adminDbRepository';
import { RefreshTokenDbInterface } from '../../../app/repositories/refreshTokenDBRepository';
import { AuthServiceInterface } from '../../../app/services/authServiceInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { AdminSavedDbInterface } from '../../../types/adminAuthInterface';
import AppError from '../../../utils/appError';

export const adminLogin = async (
    email: string,
    password: string,
    adminRepository: ReturnType<AdminDbInterface>,
    refreshTokenRepository: ReturnType<RefreshTokenDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const admin: AdminSavedDbInterface | null = await adminRepository.getAdminByEmail(email);

    if (!admin) {
        throw new AppError('Admin not found..!', HttpStatusCodes.NOT_FOUND);
    }

    const isPasswordCorrect = await authService.comparePassword(password, admin.password);

    if (!isPasswordCorrect) {
        throw new AppError('Your password is incorrect. Please try again', HttpStatusCodes.UNAUTHORIZED);
    }

    const payload = {
        Id: admin._id,
        email: admin.email,
        role: 'admin',
    };

    await refreshTokenRepository.deleteRefreshToken(admin._id);

    const accessToken = authService.generateToken(payload);

    const refreshToken = authService.generateRefreshToken(payload);

    const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);

    await refreshTokenRepository.saveRefreshToken(admin._id, refreshToken, expirationDate);

    return {
        accessToken,
        refreshToken,
    };
};
