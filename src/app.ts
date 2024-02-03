import express, { Application, NextFunction } from 'express';
import http from 'http';
import colors from 'colors.ts';
import expressConfig from './frameworks/webserver/express';
import serverConfig from './frameworks/webserver/server';
import connectToMongoDb from './frameworks/database/mongodb/connection';
import connectToRedis from './frameworks/database/redis/connection';
import routes from './frameworks/webserver/routes';
import AppError from './utils/appError';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandling';

colors?.enable();

const app: Application = express();
const server = http.createServer(app);

//* connecting mongoDb
connectToMongoDb();

//* connecting redis
const redisClient = connectToRedis().createRedisClient();

//* express config connection
expressConfig(app);

//* routes for each endpoint
routes(app, redisClient);

// * handles server side errors
app.use(errorHandlingMiddleware);

// * catch 404 and forward to error handler
app.all('*', (req, res, next: NextFunction) => {
    next(new AppError('Not Found', 404));
});

// * starting the server with server config
serverConfig(server).startServer();

export type RedisClient = typeof redisClient;
