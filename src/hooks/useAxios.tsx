import { useState, useEffect } from "react";
import { axiosInstance } from "../services/instance.axios.tsx";

const useAxios = (axiosParams: any) => {
  const [response, setResponse] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (params: any) => {
    try {
      const { data } = await axiosInstance.request(params);
      setResponse(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { response, error, loading };
};

export default useAxios;
