import { Request, Response } from 'express';
import { Carona, Usuario, Veiculo, Avaliacao } from '../models/models';
import { Op, fn, col } from 'sequelize';


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
    const { origem_, destino_, data_, horario_de_partida_ } = req.params;

    try {
        const caronasDisponiveis = await Carona.findAll({
            where: { 
                origem: origem_,
                destino: destino_,
                data: data_,
                horario_de_partida: horario_de_partida_
            },
            raw: true
        });
        
        const dadosMotorista = await Usuario.findAll({
            attributes: [
                ['id', 'id_motorista'],
                ['nome', 'nome_motorista'],
                [fn('count', fn('DISTINCT', col('caronas.id_carona_atual'))), 'total_caronas'],
                [fn('avg', col('avaliacoes_recebidas.nota')), 'nota_motorista'],
            ],
            include: [
                {
                    model: Carona,
                    attributes: [],
                    as: 'caronas',
                    required: true
                },
                {
                    model: Avaliacao,
                    attributes: [],
                    required: true,
                    as: 'avaliacoes_recebidas',
                    where: {
                        id_da_carona: { [Op.col]: 'caronas.id_carona_atual' }
                    }
                }
            ],
            group: ['id_motorista'],
            raw: true,
        });
        
        // Isso é necessário para que eu possa acessar as colunas `total_caronas` e `nota_motorista`
        const motoristas: any[] = JSON.parse(JSON.stringify(dadosMotorista));
        
        // Concatena os dados de interesse da carona com os dados de interesse do motorista
        // É como se essa fosse a query principal e as de cima fossem subqueries
        const resultado = caronasDisponiveis.map(c => {
            const motorista = motoristas.find(m => m.id_motorista === c.id_usuario);

            return motorista ? {
                id_carona: c.id_carona_atual,
                data: c.data,
                horario_de_partida: c.horario_de_partida,
                id_motorista: motorista.id_motorista,
                nome_motorista: motorista.nome_motorista,
                total_caronas: motorista.total_caronas,
                nota_motorista: motorista.nota_motorista
            } : null;
        }).filter(item => item !== null);
                      
        // Caso nenhuma carona seja encontrada a partir dos dados fornecidos
        if (resultado.length === 0) {
            res.status(404).json({ message: 'Nenhuma carona encontrada' });
        }

        res.status(201).json(resultado);
    } catch(error) {
        res.status(500).json({ message: 'Erro ao pedir carona' });
    }
};
