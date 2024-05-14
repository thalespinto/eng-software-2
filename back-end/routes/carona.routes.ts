import express from 'express';
import { oferecerCarona } from '../controller/carona';

const router = express.Router();

router.post('/oferecer', oferecerCarona);

export default router;