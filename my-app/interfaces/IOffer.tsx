import { IUser } from "./IUser";

export interface IOffer {
    origin: string;
    destination: string;
    date: Date;
    passengers: IUser[];
    cnh: string;
    vehicles: IVehicle[]; // Adicionando a lista de veículos
}

export interface IVehicle {
    modelo: string;
    placa: string;
    capacidade: string;
}
