import { Request, Response, NextFunction } from 'express';
import { Avaliacao, Usuario } from '../models/models';

export const recalcularNotaMedia = async (id_usuario_avaliado: number) => {
    const avaliacoes = await Avaliacao.findAll({
        where: { id_usuario_avaliado },
        attributes: ['nota'],
    });

    const somaNotas = avaliacoes.reduce((acc, avaliacao) => acc + avaliacao.nota, 0);
    const media = somaNotas / avaliacoes.length;

    const usuario = await Usuario.findByPk(id_usuario_avaliado);
    if (usuario) {
        usuario.nota_media = media;
        await usuario.save();
    }
};

export const addAvaliacao = async (req: Request, res: Response, next: NextFunction) => {
    const { id_usuario_avaliador, id_usuario_avaliado, id_da_carona, nota } = req.body;
    try {
        const avaliacao = await Avaliacao.create({
            id_usuario_avaliador,
            id_usuario_avaliado,
            id_da_carona,
            nota,
        });

        await recalcularNotaMedia(id_usuario_avaliado);

        res.status(201).json(avaliacao);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar avaliação' });
    }
};

export const getAvaliacoes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const avaliacoes = await Avaliacao.findAll();
        res.status(200).json(avaliacoes);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter avaliações' });
    }
};

export const getAvaliacaoById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const avaliacao = await Avaliacao.findByPk(id);
        if (avaliacao) {
            res.status(200).json(avaliacao);
        } else {
            res.status(404).json({ message: 'Avaliação não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter avaliação por ID' });
    }
};

export const updateAvaliacao = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { nota } = req.body;
    try {
        const avaliacao = await Avaliacao.findByPk(id);
        if (avaliacao) {
            await avaliacao.update({ nota });

            await recalcularNotaMedia(avaliacao.id_usuario_avaliado);

            res.status(200).json(avaliacao);
        } else {
            res.status(404).json({ message: 'Avaliação não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar avaliação' });
    }
};

export const deleteAvaliacao = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const avaliacao = await Avaliacao.findByPk(id);
        if (avaliacao) {
            await avaliacao.destroy();
            res.status(200).json({ message: 'Avaliação deletada' });
        } else {
            res.status(404).json({ message: 'Avaliação não encontrada' });
        }
    } catch (error) {
        next(error);
    }
};
