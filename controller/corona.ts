import { Request, Response } from 'express';
import { Carona, Usuario, Veiculo } from '../models/models';

export const oferecerCarona = async (req: Request, res: Response) => {
    const { id_usuario, origem, destino, data, horario_de_partida, horario_de_retorno, qt_de_passageiros, aceita_automaticamente, raio_de_aceitacao_em_km } = req.body;

    try {
        const usuario = await Usuario.findByPk(id_usuario);
        const veiculo = await Veiculo.findOne({ where: { id_usuario: id_usuario } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (!veiculo) {
            return res.status(404).json({ message: 'Veículo não encontrado para este usuário' });
        }

        const novaCarona = await Carona.create({
            id_usuario,
            origem,
            destino,
            data,
            horario_de_partida,
            horario_de_retorno,
            qt_de_passageiros,
            aceita_automaticamente,
            raio_de_aceitacao_em_km
        });

        const resposta = {
            motorista: usuario.nome,
            veiculo: {
                placa: veiculo.placa,
                marca: veiculo.marca,
                modelo: veiculo.modelo,
                cor: veiculo.cor
            },
            origem: novaCarona.origem,
            destino: novaCarona.destino,
            data: novaCarona.data,
            horario_de_partida: novaCarona.horario_de_partida,
            horario_de_retorno: novaCarona.horario_de_retorno,
            qt_de_passageiros: novaCarona.qt_de_passageiros,
            aceita_automaticamente: novaCarona.aceita_automaticamente,
            raio_de_aceitacao_em_km: novaCarona.raio_de_aceitacao_em_km
        };

        res.status(201).json(resposta);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao oferecer carona' });
    }
};
