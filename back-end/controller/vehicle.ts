import { Request, Response } from 'express';
import { Veiculo } from '../models/models';

export const createVehicle = async (req: Request, res: Response) => {
  try {
      const { placa, marca, modelo, cor, id_usuario } = req.body;
      const newVehicle = await Veiculo.create({ placa, marca, modelo, cor, id_usuario });
      res.status(201).json(newVehicle);
  } catch (error) {
      res.status(500).json({ message: 'Erro ao criar veículo' });
  }
};

export const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const vehicles = await Veiculo.findAll();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter veículos' });
    }
};

export const getVehicle = async (req: Request, res: Response) => {
    try {
        const vehicles = await Veiculo.findAll();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter veículos' });
    }
};

export const getUserVehicles = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const vehicles = await Veiculo.findAll({ where: { id_usuario: userId } });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter veículos do usuário' });
    }
}

export const getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vehicle = await Veiculo.findByPk(id);
        if (vehicle) {
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({ message: 'Veículo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter veículo por ID' });
    }
};

export const updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { placa, marca, modelo, cor, id_usuario } = req.body;
    try {
        const vehicle = await Veiculo.findByPk(id);
        if (vehicle) {
            await vehicle.update({ placa, marca, modelo, cor, id_usuario });
            res.status(200).json({ message: 'Veículo atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Veículo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar veículo' });
    }
};

export const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vehicle = await Veiculo.findByPk(id);
        if (vehicle) {
            await vehicle.destroy();
            res.status(200).json({ message: 'Veículo excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Veículo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir veículo' });
    }
};
