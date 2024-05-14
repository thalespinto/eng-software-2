import {
  createContext,
  useContext,
  useState,
} from "react";
import { ILogin } from "../../interfaces/ILogin";
import { userContext } from "../UserProvider";
import { createSession } from "../../server/api";

export const authContext = createContext<{
  isSignedIn: boolean;
  SignIn: (credentials: ILogin) => Promise<void>;
  SignOut: () => void;
} | null>(null);

const AuthProvider = ({ children }: { children: any }) => {
  const userInfos = useContext(userContext);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const SignIn = async (crenditials: ILogin) => {
    try {
      const response = await createSession(crenditials.cpf, crenditials.senha);
      if (response.user) {  
        userInfos?.setUser({
          createdAt: new Date(response.user.createdAt),
          updatedAt: new Date(response.user.updatedAt),
          id: response.user.id,
          login: response.user.login,
          cpf: response.user.cpf,
          senha: response.user.senha,
          nome: response.user.nome,
          esta_oferecendo_carona: response.user.esta_oferecendo_carona,
          // reputacao: response.user.reputacao,
        });
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
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
