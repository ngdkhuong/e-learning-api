import { Application } from 'express';
import { RedisClient } from '../../../app';
import authRouter from './auth.ts';

const routes = (app: Application, redisClient: RedisClient) => {
    app.use('/api/test', () => {
        console.log('Server Testing');
    });
    app.use('/api/auth', authRouter());
};

export default routes;
