import express from 'express';
import { oferecerCarona, getHistoricoCaronas, listarCaronasDisponiveis } from '../controller/carona';

const router = express.Router();

router.post('/oferecer', oferecerCarona);
router.get('/historico/:id_usuario', getHistoricoCaronas);
router.get('/caronasDisponiveis/:origem_/:destino_/:data_/:horario_de_partida_', listarCaronasDisponiveis);


export default router;
