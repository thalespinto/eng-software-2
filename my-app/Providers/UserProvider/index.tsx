import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { ILogin } from "../../interfaces/ILogin";
import { IUser } from "../../interfaces/IUser";

export const userContext = createContext<{
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
} | null>(null);

const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<IUser | undefined>();

  return (
    <userContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
