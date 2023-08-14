import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import { axiosAuth } from "../services/axios.service";

const useLogoutRedirect = () => {
  const { setAccessToken, setIsLoggedIn }: AuthContextTypes =
    useContext(AuthContext)!;
  const navigate = useNavigate();

  const logoutRedirect = async (redirectPage: string) => {
    setAccessToken("");
    try {
      await axiosAuth.delete(`/logout`, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      navigate(redirectPage);
    }
  };
  return logoutRedirect;
};

export default useLogoutRedirect;
