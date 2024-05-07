import {
  createContext,
  useContext,
  useState,
} from "react";
import { ILogin } from "../../interfaces/ILogin";
import { userContext } from "../UserProvider";

export const authContext = createContext<{
  isSignedIn: boolean;
  SignIn: (credentials: ILogin) => void;
  SignOut: () => void;
} | null>(null);

const AuthProvider = ({ children }: { children: any }) => {
  const userInfos = useContext(userContext);

  const [isSignedIn, setIsSignedIn] = useState(false);

  const SignIn = (crenditials: ILogin) => {
    userInfos?.setUser({
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
    setIsSignedIn(true);
  };

  const SignOut = () => {
    userInfos?.setUser(undefined);
    setIsSignedIn(false);
  };

  return (
    <authContext.Provider
      value={{ isSignedIn: isSignedIn, SignIn: SignIn, SignOut: SignOut }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
