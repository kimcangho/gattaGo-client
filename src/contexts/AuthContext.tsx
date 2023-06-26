import { createContext, useState } from "react";

const AuthContext = createContext({});

export interface AuthContent {
  accessToken: string;
  setAccessToken: Function;
}

export const AuthProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState(""); //  send via header bearer token
  const [email, setEmail] = useState(""); //  stand-in for user information

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, email, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
