import express from 'express';
import authController from '../../../adapters/controllers/authController.ts';

const authRouter = () => {
    const router = express.Router();

    const controller = authController();
};
