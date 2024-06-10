import { Router } from 'express';
import {
    addAvaliacao,
    getAvaliacoes,
    getAvaliacaoById,
    updateAvaliacao,
    deleteAvaliacao
} from '../controller/avaliacao';

const router = Router();

router.post('/create', addAvaliacao);
router.get('/get', getAvaliacoes);
router.get('/getId/:id', getAvaliacaoById);
router.put('/update/:id', updateAvaliacao);
router.delete('/delete/:id', deleteAvaliacao);

export default router;
