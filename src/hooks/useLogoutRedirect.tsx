import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const useLogoutRedirect = (redirectPage: string) => {
  const { setAccessToken, setIsLoggedIn }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutRedirect = async () => {
    setAccessToken("");
    setIsLoggedIn(false);
    navigate(`/${redirectPage}`);
  };
  return logoutRedirect;
};

export default useLogoutRedirect;
