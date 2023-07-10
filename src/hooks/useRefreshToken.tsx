import axiosService from "../services/axios.service";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

const useRefreshToken = () => {

    // const {accessToken, setAccessToken}: any = useContext(AuthContext)

  const refresh = async () => {
    const response = await axiosService.get('/reissue', {
        withCredentials: true   //  setting allows us to send refresh token in cookie
    });
    //  setAuth(prev => {
    //     console.log(JSON.stringify(prev));
    //     console.log(response.data.accesstoken);
    //     return {...prev, acessToken: response.data.accessToken}
    // })
    return response.data.accessToken
  };

  return refresh;
};

export default useRefreshToken;
