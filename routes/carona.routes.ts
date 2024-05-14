import express from 'express';
import { oferecerCarona } from '../controller/corona';

const router = express.Router();

router.post('/oferecer', oferecerCarona);

export default router;
