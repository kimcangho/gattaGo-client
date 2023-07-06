import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import { TeamData } from "../interfaces/EntityData";

const DashboardPage = (): JSX.Element => {
  const { teamId } = useParams<string>();
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;
  const [_currentTeam, setCurrentTeam] = useState<TeamData | {}>({});

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
      const { id, name, division, level, eligibility } = data;
      setCurrentTeam({ id, name, division, level, eligibility });
    };

    getTeam();
  }, []);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
