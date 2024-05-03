import { ICar } from "../interfaces/ICar";

export const veiculos: ICar[] = [
    {
        id: 1,
        placa: "ABC1234",
        marca: "Toyota",
        modelo: "Corolla",
        cor: "Prata",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        placa: "DEF5678",
        cor: "Vermelha",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        placa: "GHI9012",
        marca: "Volvo",
        modelo: "FH 460",
        cor: "Branco",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 4,
        placa: "JKL3456",
        marca: "Tesla",
        modelo: "Model S",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 5,
        placa: "MNO7890",
        cor: "Preto",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
