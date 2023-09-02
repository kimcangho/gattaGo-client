import { createContext, useState } from "react";

export interface AuthContextTypes {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  currentTeamDetails: CurrentTeamDetails;
  setCurrentTeamDetails: React.Dispatch<React.SetStateAction<object>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CurrentTeamDetails {
  name?: string;
  eligibility?: string;
  division?: string;
}

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: AuthContextProps): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [currentTeamDetails, setCurrentTeamDetails] =
    useState<CurrentTeamDetails>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userId,
        setUserId,
        email,
        setEmail,
        isLoggedIn,
        setIsLoggedIn,
        currentTeamDetails,
        setCurrentTeamDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
