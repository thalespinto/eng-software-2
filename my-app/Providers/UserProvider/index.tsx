import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { ILogin } from "../../interfaces/ILogin";
import { IUser } from "../../interfaces/IUser";

export const userContext = createContext<{
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
} | null>(null);

const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<IUser | undefined>({
    createdAt: new Date("2024-05-06T08:00:00Z"),
    updatedAt: new Date("2024-05-06T08:30:00Z"),
    id: 1,
    login: "usuario123",
    cpf: "123.456.789-00",
    senha: "senha123",
    nome: "João da Silva",
    esta_oferecendo_carona: true,
    reputacao: 4.5,
  });

  return (
    <userContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
