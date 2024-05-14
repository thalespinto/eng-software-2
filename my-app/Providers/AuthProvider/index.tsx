import React, { createContext, useContext, useState } from "react";
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

  const SignIn = async (credentials: ILogin) => {
    try {
      const response = await createSession(credentials.cpf, credentials.senha);
      console.log("AuthProvider Response:", response);
      if (response?.user) {
        userInfos?.setUser(response.user);
        setIsSignedIn(true);
      } else {
        alert(response?.message || "Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente mais tarde.");
    }
  };

  const SignOut = () => {
    userInfos?.setUser(undefined);
    setIsSignedIn(false);
  };

  return (
    <authContext.Provider value={{ isSignedIn, SignIn, SignOut }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
