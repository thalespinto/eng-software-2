import express from 'express';
import { oferecerCarona, getHistoricoCaronas } from '../controller/carona';

const router = express.Router();

router.post('/oferecer', oferecerCarona);
router.get('/historico/:id_usuario', getHistoricoCaronas);

export default router;