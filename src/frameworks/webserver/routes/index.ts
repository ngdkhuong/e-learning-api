import { Application } from 'express';
import { RedisClient } from '../../../app';

const routes = (app: Application, redisClient: RedisClient) => {
    app.use('/api/test', () => {
        console.log('Server Testing');
    });
};

export default routes;
