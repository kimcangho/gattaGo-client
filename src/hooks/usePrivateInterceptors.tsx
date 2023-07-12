import { axiosPrivate } from "../services/axios.service";
import { useEffect, useContext } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;

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

    //  Response interceptor - makes follow-up API call if access token expired
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      async (response) => {
        console.log(response);
        return response; //  if access token still valid, return response
      },
      async (err) => {
        //  handle invalid access token
        const prevRequest = err.config;
        if (err.response.status === 403 && !prevRequest.sent) {
          // set sent property so we don't endlessly loop trying to get new access token
          prevRequest.sent = true; //  indicates that we only try to get access token once
          const newAccessToken = await refresh(); //  get new access token from useRefresh
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest); //  pass in config as argument for axios API call
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [AuthContext, refresh]); //  Authcontext or accesstoken state?

  return axiosPrivate;
};

export default useAxiosPrivate;
