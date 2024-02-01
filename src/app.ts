import express, { Application, NextFunction } from 'express';
import http from 'http';
import colors from 'colors.ts';
import expressConfig from './frameworks/webserver/express';
import serverConfig from './frameworks/webserver/server';
import configKeys from './config';

colors?.enable();

const app: Application = express();
const server = http.createServer(app);

//* express config connection
expressConfig(app);

// * starting the server with server config
serverConfig(server).startServer();
