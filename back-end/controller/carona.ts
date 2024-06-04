import { Request, Response } from 'express';
import { Carona, Usuario, Veiculo, Avaliacao } from '../models/models';
import { Op, fn, col } from 'sequelize';
import moment from 'moment';


export const oferecerCarona = async (req: Request, res: Response) => {
    const { id_usuario, id_veiculo, origem, destino, data, horario_de_partida, horario_de_retorno, qt_de_passageiros, aceita_automaticamente, raio_de_aceitacao_em_km } = req.body;

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
            id_veiculo,
            origem,
            destino,
            data,
            horario_de_partida,
            horario_de_retorno,
            qt_de_passageiros,
            aceita_automaticamente,
            raio_de_aceitacao_em_km: aceita_automaticamente ? raio_de_aceitacao_em_km : null
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

export const getHistoricoCaronas = async (req: Request, res: Response) => {
    const { id_usuario } = req.params;

    try {
        const historicoCaronas = await Carona.findAll({
            where: { id_usuario },
            order: [['data', 'DESC']],
        });

        if (!historicoCaronas.length) {
            return res.status(404).json({ message: 'Nenhuma carona encontrada' });
        }

        res.status(200).json(historicoCaronas);
    } catch (error) {
        console.error('Erro ao buscar histórico de caronas:', error);
        res.status(500).json({ message: 'Erro ao buscar histórico de caronas' });
    }
};


export const listarCaronasDisponiveis = async (req: Request, res: Response) => {
    const { origem_, destino_, data_, horario_de_partida_ } = req.params;

    try {
        const dataFormatada = moment(data_, 'YYYY-MM-DD', true);
        const horarioDePartidaFormatado = moment(horario_de_partida_, 'HH:mm:ss', true);

        if (!dataFormatada.isValid() || !horarioDePartidaFormatado.isValid()) {
            return res.status(400).json({ message: 'Formato de data ou horário inválido' });
        }

        const caronasDisponiveis = await Carona.findAll({
            where: { 
                origem: origem_,
                destino: destino_,
                data: dataFormatada.format('YYYY-MM-DD'),
                horario_de_partida: horarioDePartidaFormatado.format('HH:mm:ss')
            },
            include: [
                {
                    model: Usuario,
                    as: 'motorista',
                    attributes: ['id', 'nome'],
                }
            ],
            raw: true
        });
        
        if (!caronasDisponiveis.length) {
            return res.status(404).json({ message: 'Nenhuma carona disponível' });
        }

        res.status(200).json(caronasDisponiveis);
    } catch (error) {;
        res.status(500).json({ message: 'Erro ao listar caronas disponíveis' });
    }
};