import { ReactNode, createContext, useEffect, useState } from "react";
import { IHike } from "../../../../../interfaces/IHike";

export const hikeContext = createContext<{
  hikeInfos: Partial<IHike>;
  setHikeInfos: React.Dispatch<React.SetStateAction<Partial<IHike>>>;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
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

  useEffect(() => {
    console.log(hikeInfos);
  }, [hikeInfos]);

  return (
    <hikeContext.Provider
      value={{ hikeInfos, setHikeInfos, setOrigin, setDestination }}
    >
      {children}
    </hikeContext.Provider>
  );
};

export default HikeProvider;
