import { Request, Response } from 'express';
import sequelize from '../util/database';
import { Carona, Usuario, Veiculo, Avaliacao } from '../models/models';
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

export const getAllCaronas = async (req: Request, res: Response) => {
    try {
        const caronas = await Carona.findAll({
            include: [
                {
                    model: Usuario,
                    as: 'motorista',
                    attributes: ['id', 'nome'],
                }
            ],
            raw: true
        });

        if (!caronas.length) {
            return res.status(404).json({ message: 'Nenhuma carona encontrada' });
        }

        const mappedCaronas = caronas.map((carona: any) => ({
            id_carona: carona.id_carona_atual,
            origem: carona.origem,
            destino: carona.destino,
            data: carona.data,
            horario_de_partida: carona.horario_de_partida,
            horario_de_retorno: carona.horario_de_retorno,
            qt_de_passageiros: carona.qt_de_passageiros,
            aceita_automaticamente: carona.aceita_automaticamente,
            raio_de_aceitacao_em_km: carona.raio_de_aceitacao_em_km,
            motorista: {
                id: carona['motorista.id'],
                nome: carona['motorista.nome'],
            },
        }));

        res.status(200).json(mappedCaronas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar todas as caronas' });
    }
};

export const cancelarCarona = async (req: Request, res: Response) => {
    const { id_carona } = req.params;

    const transaction = await sequelize.transaction();

    try {
        const carona = await Carona.findByPk(id_carona, { transaction });

        if (!carona) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Carona não encontrada' });
        }

        await Avaliacao.update(
            { id_da_carona: null },
            { where: { id_da_carona: id_carona }, transaction }
        );

        await carona.destroy({ transaction });

        await transaction.commit();

        res.status(200).json({ message: 'Carona cancelada com sucesso' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Erro ao cancelar carona' });
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