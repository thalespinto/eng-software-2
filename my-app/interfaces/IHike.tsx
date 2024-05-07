import { IUser } from "./IUser";

export interface IHike {
    origin: string;
    destination: string;
    date: Date;
    passengers: IUser[];
}