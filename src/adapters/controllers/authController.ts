import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthServiceInterface } from '../../app/services/authServiceInterface';
import { AuthService } from '../../frameworks/services/authService';

const authController = (authServiceInterface: AuthServiceInterface, authServiceImpl: AuthService) => {
    const authService = authServiceInterface(authServiceImpl());
};
