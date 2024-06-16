import { IUser } from "./IUser";

export interface IOffer {
    origin: string;
    destination: string;
    date: Date;
    passengers: IUser[];
    cnh: string;
    vehicles: IVehicle[]; 
    passengerCount: string;
    acceptAutomatically?: boolean;
    radius?: string | null;
}

export interface IVehicle {
    modelo: string;
    placa: string;
    capacidade: string;
}
