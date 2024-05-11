import React, { createContext, useState, ReactNode } from 'react';
import { IOffer } from "../../../../../interfaces/IOffer";
import { IUser } from "../../../../../interfaces/IUser";

interface IVehicle {
  modelo: string;
  placa: string;
  capacidade: string;
}

export const hikeContext = createContext<{
  hikeInfos: Partial<IOffer>;
  setHikeInfos: React.Dispatch<React.SetStateAction<Partial<IOffer>>>;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setPassengers: (passengers: IUser[]) => void;
  setCNH: (cnh: string) => void;
  vehicles: IVehicle[];
  addVehicle: (vehicle: IVehicle) => void;
  deleteVehicle: (index: number) => void;
} | null>(null);

const RideProvider = ({ children }: { children: ReactNode }) => {
  const [hikeInfos, setHikeInfos] = useState<Partial<IOffer>>({
    destination: "",
    origin: "",
    date: new Date(),
    passengers: [],
    cnh: "",
  });

  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  const setOrigin = (origin: string) => {
    setHikeInfos((prevState) => ({ ...prevState, origin }));
  };

  const setDestination = (destination: string) => {
    setHikeInfos((prevState) => ({ ...prevState, destination }));
  };

  const setPassengers = (passengers: IUser[]) => {
    setHikeInfos((prevState) => ({ ...prevState, passengers }));
  };

  const setCNH = (cnh: string) => {
    setHikeInfos((prevState) => ({ ...prevState, cnh }));
  };

  const addVehicle = (vehicle: IVehicle) => {
    setVehicles([...vehicles, vehicle]);
  };

  const deleteVehicle = (index: number) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles.splice(index, 1);
    setVehicles(updatedVehicles);
  };

  return (
    <hikeContext.Provider
      value={{
        hikeInfos,
        setHikeInfos,
        setOrigin,
        setDestination,
        setPassengers,
        setCNH,
        vehicles,
        addVehicle,
        deleteVehicle,
      }}
    >
      {children}
    </hikeContext.Provider>
  );
};

export default RideProvider;
