import { Request, Response } from 'express';
import { Usuario } from '../models/models';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
  try {
      const { cpf, senha, nome } = req.body;
      const hashedPassword = await bcrypt.hash(senha, 10);
      const newUser = await Usuario.create({ cpf, senha: hashedPassword, nome });
      res.status(201).json(newUser);
  } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await Usuario.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ message: 'Erro ao obter usuários' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await Usuario.findByPk(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao obter usuário por ID:', error);
        res.status(500).json({ message: 'Erro ao obter usuário por ID' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cpf, senha, nome } = req.body;
    try {
        const user = await Usuario.findByPk(id);
        if (user) {
            await user.update({ cpf, senha, nome });
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await Usuario.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'Usuário excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
};
