import * as express from 'express';
import chirpsRouter from './chirps';

let router = express.Router();

router.use('/api/chirps', chirpsRouter);

export default router; 