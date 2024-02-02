import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import configKeys from '../../config';

export const authService = () => {
    const hashPassword = async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };

    const comparePassword = (password: string, hashPassword: string) => {
        return bcrypt.compare(password, hashPassword);
    };

    const generateToken = (payload: JwtPayload) => {
        const token = jwt.sign({ payload }, configKeys.JWT_SECRET, { expiresIn: '3h' });
        return token;
    };

    const generateRefreshToken = (payload: JwtPayload) => {
        const token = jwt.sign({ payload }, configKeys.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        return token;
    };

    const verifyToken = (token: string) => {
        return jwt.verify(token, configKeys.JWT_SECRET);
    };

    const decodeToken = (token: string) => {
        const decodedToken: jwt.JwtPayload | null = jwt.decode(token) as jwt.JwtPayload | null;
        return decodedToken;
    };

    const decodedTokenAndReturnExpireDate = (token: string): number => {
        const decodedToken: any = jwt.decode(token);
        let expirationTimeStamp: number;
        if (decodedToken && decodedToken.exp) {
            expirationTimeStamp = decodedToken.exp * 1000;
        } else {
            expirationTimeStamp = 0;
        }
        return expirationTimeStamp;
    };

    return {
        hashPassword,
        comparePassword,
        generateToken,
        generateRefreshToken,
        verifyToken,
        decodeToken,
        decodedTokenAndReturnExpireDate,
    };
};

export type AuthService = typeof authService;

export type AuthServiceReturn = ReturnType<AuthService>;
