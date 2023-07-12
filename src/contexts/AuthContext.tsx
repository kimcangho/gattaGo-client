import { createContext, useState } from "react";

export interface AuthContextTypes {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  // auth: {};
  // setAuth: React.Dispatch<React.SetStateAction<{}>>;
}

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: AuthContextProps): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider
      value={{
        accessToken,  //  access token
        setAccessToken,
        email,  //  user
        setEmail,
        isLoggedIn,
        setIsLoggedIn,
        // auth,
        // setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
