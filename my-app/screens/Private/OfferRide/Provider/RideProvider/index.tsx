import { IOffer } from "../../../../../interfaces/IOffer";
import { IUser } from "../../../../../interfaces/IUser";
import { ICar } from "../../../../../interfaces/ICar";
import { api } from "../../../../../server/api";
import { userContext } from "../../../../../Providers/UserProvider";
import React, { createContext, useState, useContext, ReactNode } from 'react';

export const RideContext = createContext<{
  RideInfos: Partial<IOffer>;
  setRideInfos: React.Dispatch<React.SetStateAction<Partial<IOffer>>>;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setPassengers: (passengers: IUser[]) => void;
  setCNH: (cnh: string) => void;
  setPassengerCount: (passengerCount: string) => void;
  vehicles: ICar[];
  addVehicle: (vehicle: ICar) => void;
  deleteVehicle: (index: number) => void;
  setAcceptAutomatically: (acceptAutomatically: boolean) => void;
  setRadius: (radius: string | null) => void;
  setSelectedVehicle: (vehicle: ICar | null) => void;
  selectedVehicle: ICar | null;
  submitRide: () => Promise<void>;
} | null>(null);

const RideProvider = ({ children }: { children: ReactNode }) => {
  const [RideInfos, setRideInfos] = useState<Partial<IOffer>>({});
  const [vehicles, setVehicles] = useState<ICar[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<ICar | null>(null);
  const userInfos = useContext(userContext);

  const setOrigin = (origin: string) => {
    setRideInfos(prev => ({ ...prev, origin }));
  };

  const setDestination = (destination: string) => {
    setRideInfos(prev => ({ ...prev, destination }));
  };

  const setPassengers = (passengers: IUser[]) => {
    setRideInfos(prev => ({ ...prev, passengers }));
  };

  const setCNH = (cnh: string) => {
    setRideInfos(prev => ({ ...prev, cnh }));
  };

  const setPassengerCount = (passengerCount: string) => {
    setRideInfos(prev => ({ ...prev, passengerCount }));
  };

  const addVehicle = (vehicle: ICar) => {
    setVehicles(prev => [...prev, vehicle]);
  };

  const deleteVehicle = (index: number) => {
    setVehicles(prev => prev.filter((_, i) => i !== index));
  };

  const setAcceptAutomatically = (acceptAutomatically: boolean) => {
    setRideInfos(prev => ({ ...prev, acceptAutomatically }));
  };

  const setRadius = (radius: string | null) => {
    setRideInfos(prev => ({ ...prev, radius }));
  };

  const submitRide = async () => {
    try {
      const userId = userInfos?.user?.id;
      if (userId) {
        const rideData = {
          id_usuario: userId,
          id_veiculo: selectedVehicle?.id || null,
          origem: RideInfos.origin || "",
          destino: RideInfos.destination || "",
          data: RideInfos.date ? new Date(RideInfos.date).toISOString().split("T")[0] : "",
          horario_de_partida: RideInfos.date ? new Date(RideInfos.date).toLocaleTimeString('en-GB', { hour12: false }) : "",
          horario_de_retorno: "",
          qt_de_passageiros: RideInfos.passengerCount || "",
          aceita_automaticamente: RideInfos.acceptAutomatically || false,
          raio_de_aceitacao_em_km: RideInfos.radius || null,
        };

        await api.post("/carona/oferecer", rideData);

        alert("Carona criada com sucesso!");
      } else {
        throw new Error("Usuário desconhecido");
      }
    } catch (error) {
      console.error("Erro ao criar carona", error);
      alert("Erro ao criar carona");
    }
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
        setAcceptAutomatically,
        setRadius,
        setSelectedVehicle,
        selectedVehicle,
        submitRide,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export default RideProvider;
