import { axiosPrivate } from "../services/axios.service";
import { useEffect, useContext } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
// import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { accessToken }: AuthContextTypes = useContext(AuthContext)!;
  // const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"])
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // const responseInterceptor = axiosPrivate.interceptors.response.use(
    //   (response) => response,
    //   async (err) => {
    //     const prevRequestConfig = err.config;
    //     if (err.response.status === 403 && !prevRequestConfig.sent) {
    //       prevRequestConfig.sent = true;
    //       const newAccessToken = await refresh();
    //       prevRequestConfig.headers[
    //         "Authorization"
    //       ] = `Bearer ${newAccessToken}`;
    //       return axiosPrivate(prevRequestConfig);
    //     }
    //     return Promise.reject(err);
    //   }
    // );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      // axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [AuthContext, 
    // refresh
  ]); //  Authcontext or accesstoken state?

  return axiosPrivate;
};

export default useAxiosPrivate;
