import { Application } from 'express';
import { RedisClient } from '../../../app';
import authRouter from './auth';
import studentRouter from './student';

const routes = (app: Application, redisClient: RedisClient) => {
    app.use('/api/test', () => {
        console.log('Server Testing');
    });
    app.use('/api/auth', authRouter());
    app.use('/api/students', studentRouter(redisClient));
};

export default routes;
