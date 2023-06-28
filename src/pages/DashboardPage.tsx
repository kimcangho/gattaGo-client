import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

interface AuthContextData {
  accessToken: string;
}

const DashboardPage = () => {
  const { teamId } = useParams();

  const { accessToken }: AuthContextData = useContext(AuthContext)!;
  const [_currentTeam, setCurrentTeam]: any = useState({});

  //  Get team details
  useEffect(() => {
    const getTeam = async () => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data } = await axios.get(
        `http://localhost:8888/teams/${teamId}`,
        {
          headers,
          withCredentials: true,
        }
      );
      const { id, name, division, level, gender } = data;
      setCurrentTeam({ id, name, division, level, gender });
    };

    getTeam();
  }, []);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
