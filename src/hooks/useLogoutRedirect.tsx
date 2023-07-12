import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import { axiosAuth } from "../services/axios.service";

const useLogoutRedirect = () => {
  const { setAccessToken, setIsLoggedIn }: AuthContextTypes =
    useContext(AuthContext)!;
  const navigate = useNavigate();

  const logoutRedirect = async (redirectPage: string) => {
    try {
      await axiosAuth.delete(`/logout`, {
        withCredentials: true,
      });
      setAccessToken("");
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    } finally {
      navigate(redirectPage);
    }
  };
  return logoutRedirect;
};

export default useLogoutRedirect;
