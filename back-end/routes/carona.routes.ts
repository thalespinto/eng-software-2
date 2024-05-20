import express from 'express';
import { oferecerCarona, getHistoricoCaronas, listarCaronasDisponiveis } from '../controller/carona';

const router = express.Router();

router.post('/oferecer', oferecerCarona);
router.get('/historico/:id_usuario', getHistoricoCaronas);
router.get('/caronas-disponiveis/:origem/:destino/:data/:horario_de_partida', listarCaronasDisponiveis);


export default router;
