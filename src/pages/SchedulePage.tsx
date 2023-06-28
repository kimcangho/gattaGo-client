import { useEffect, useContext } from "react";
import axios from "axios";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";

const SchedulePage = () => {
  const { accessToken }: AuthContextTypes = useContext(AuthContext)!;

  useEffect(() => {
    const getRegattas = async () => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data } = await axios.get(`http://localhost:8888/regattas`, {
        headers,
        withCredentials: true,
      });
      console.log(data);
    };

    getRegattas();
  }, []);
  return <div>SchedulePage</div>;
};

export default SchedulePage;
