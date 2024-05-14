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
      if (response?.user) {
        userInfos?.setUser(response.user);
        setIsSignedIn(true);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert(error.response.data.message);
      } else if (error.response?.status === 500) {
        alert(error.response.data.message);
      }
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
