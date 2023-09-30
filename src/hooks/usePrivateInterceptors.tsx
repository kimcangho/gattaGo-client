import { axiosPrivate } from "../services/axios.service";
import { useEffect, useContext } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";

const useAxiosPrivate = () => {
  const { accessToken }: AuthContextTypes = useContext(AuthContext)!;

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

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [AuthContext]);

  return axiosPrivate;
};

export default useAxiosPrivate;
