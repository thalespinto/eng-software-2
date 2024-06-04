import React, { createContext, useState, ReactNode } from 'react';
import { IOffer } from "../../../../../interfaces/IOffer";
import { IUser } from "../../../../../interfaces/IUser";

interface IVehicle {
  modelo: string;
  placa: string;
}

export const RideContext = createContext<{
  RideInfos: Partial<IOffer>;
  setRideInfos: React.Dispatch<React.SetStateAction<Partial<IOffer>>>;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setPassengers: (passengers: IUser[]) => void;
  setCNH: (cnh: string) => void;
  setPassengerCount: (passengerCount: string) => void;
  vehicles: IVehicle[];
  addVehicle: (vehicle: IVehicle) => void;
  deleteVehicle: (index: number) => void;
} | null>(null);

const RideProvider = ({ children }: { children: ReactNode }) => {
  const [RideInfos, setRideInfos] = useState<Partial<IOffer>>({
    destination: "",
    origin: "",
    date: new Date(),
    passengers: [],
    cnh: "",
    vehicles: [],
    passengerCount: "",
  });

  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  const setOrigin = (origin: string) => {
    setRideInfos((prevState) => ({ ...prevState, origin }));
  };

  const setDestination = (destination: string) => {
    setRideInfos((prevState) => ({ ...prevState, destination }));
  };

  const setPassengers = (passengers: IUser[]) => {
    setRideInfos((prevState) => ({ ...prevState, passengers }));
  };

  const setCNH = (cnh: string) => {
    setRideInfos((prevState) => ({ ...prevState, cnh }));
  };

  const setPassengerCount = (passengerCount: string) => {
    setRideInfos((prevState) => ({ ...prevState, passengerCount }));
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
    <RideContext.Provider
      value={{
        RideInfos,
        setRideInfos,
        setOrigin,
        setDestination,
        setPassengers,
        setCNH,
        setPassengerCount,
        vehicles,
        addVehicle,
        deleteVehicle,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export default RideProvider;
