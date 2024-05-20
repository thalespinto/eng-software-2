import { Request, Response } from 'express';
import { Carona, Usuario, Veiculo } from '../models/models';
import sequelize from '../util/database';


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
    const { origem, destino, data, horario_de_partida } = req.params;

    try {
        const resultado = await sequelize.query(
            `
            WITH
                caronas_disponiveis AS (
                    SELECT *
                    FROM CARONA
                    WHERE CARONA.origem LIKE ${origem}
                        AND CARONA.destino LIKE ${destino}
                        AND CARONA.data = ${data}
                        AND CARONA.horario_de_partida = ${horario_de_partida}
                ),
                total_caronas_e_nota AS (
                    SELECT 
                        MOTORISTA.id AS id_motorista,
                        MOTORISTA.nome AS nome_motorista,
                        count(DISTINCT CARONA.id_carona_atual) AS total_caronas,
                        avg(AVALIACAO.nota) AS nota_motorista
                    FROM USUARIO AS MOTORISTA
                    JOIN CARONA ON MOTORISTA.id = CARONA.id_usuario
                    JOIN AVALIACAO ON AVALIACAO.id_usuario_avaliado = MOTORISTA.id AND AVALIACAO.id_da_carona = CARONA.id_carona_atual
                    GROUP BY MOTORISTA.id 
               )
            SELECT 
                cd.id_carona_atual AS id_carona, 
                cd.data,
                cd.horario_de_partida,
                tce.id_motorista, 
                tce.nome_motorista, 
                tce.total_caronas, 
                tce.nota_motorista
            FROM caronas_disponiveis AS cd
            JOIN total_caronas_e_nota AS tce ON cd.id_usuario = tce.id_motorista;
            `
        );

        if (!resultado) {
            res.status(404).json({ message: 'Nenhuma carona encontrada' });
        }

        res.status(201).json(resultado);
    } catch(error) {
        res.status(500).json({ message: 'Erro ao pedir carona' });
    }
};

