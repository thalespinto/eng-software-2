import { ReactNode, createContext, useEffect, useState } from "react";
import { IHike } from "../../../../../interfaces/IHike";
import { IUser } from "../../../../../interfaces/IUser";

export const hikeContext = createContext<{
  hikeInfos: Partial<IHike>;
  setHikeInfos: React.Dispatch<React.SetStateAction<Partial<IHike>>>;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setPassangers: (passangers: IUser[]) => void;
} | null>(null);

const HikeProvider = ({ children }: { children: ReactNode }) => {
  const [hikeInfos, setHikeInfos] = useState<Partial<IHike>>({
    destination: "",
    origin: "",
  });

  const setOrigin = (origin: string) => {
    setHikeInfos((prevState) => ({ ...prevState, origin: origin }));
  };

  const setDestination = (destination: string) => {
    setHikeInfos((prevState) => ({ ...prevState, destination: destination }));
  };

  const setPassangers = (passangers: IUser[]) => {
    setHikeInfos((prevState) => ({ ...prevState, passengers: passangers }));
  };

  useEffect(() => {
    console.log(hikeInfos);
  }, [hikeInfos]);

  return (
    <hikeContext.Provider
      value={{
        hikeInfos,
        setHikeInfos,
        setOrigin,
        setDestination,
        setPassangers,
      }}
    >
      {children}
    </hikeContext.Provider>
  );
};

export default HikeProvider;
