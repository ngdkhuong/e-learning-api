import express from 'express';
import refreshTokenController from '../../../controllers/refreshTokenController';
import { refreshTokenDbRepository } from './../../../app/repositories/refreshTokenDBRepository';
import { refreshTokenRepositoryMongoDB } from '../../database/mongodb/repositories/refreshTokenRepoMongoDb';
import { authServiceInterface } from './../../../app/services/authServiceInterface';
import { authService } from './../../services/authService';

const refreshRouter = () => {
    const router = express.Router();
    const controller = refreshTokenController(
        authServiceInterface,
        authService,
        refreshTokenDbRepository,
        refreshTokenRepositoryMongoDB,
    );
    router.post('/refresh', controller.refreshToken);
    return router;
};

export default refreshRouter;
