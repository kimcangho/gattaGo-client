import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { axiosAuth } from "../services/axios.service";

const useRefreshToken = () => {
  const { setAccessToken }: any = useContext(AuthContext);

  const refresh = async () => {
    const { data } = await axiosAuth.get("/refresh", {
      withCredentials: true,
    });

    setAccessToken(data.accessToken);
    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
