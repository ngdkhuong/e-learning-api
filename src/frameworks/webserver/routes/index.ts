import { Application } from 'express';
import { RedisClient } from '../../../app';
import authRouter from './auth';
import studentRouter from './student';
import refreshRouter from './refresh';
import instructorRouter from './instructor';

const routes = (app: Application, redisClient: RedisClient) => {
    // * Testing Router
    app.use('/api/test', () => {
        console.log('Server Testing');
    });

    // * Router
    app.use('/api/auth', authRouter());
    app.use('/api/all/refresh-token', refreshRouter());
    app.use('/api/instructors', instructorRouter());
    app.use('/api/students', studentRouter(redisClient));
};

export default routes;
