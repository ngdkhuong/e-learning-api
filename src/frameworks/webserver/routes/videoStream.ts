import express from 'express';
import videoStreamController from '../../../controllers/videoStreamController';
import { cloudinaryService } from '../../../frameworks/services/CloudinaryService';
import { cloudServiceInterface } from '../../../app/services/cloudServiceInterface';

const videoStreamRouter = () => {
    const router = express.Router();
    const controller = videoStreamController(cloudServiceInterface, cloudinaryService);

    router.get('/stream-video/:videoFileId', controller.streamVideo);

    return router;
};
export default videoStreamRouter;
