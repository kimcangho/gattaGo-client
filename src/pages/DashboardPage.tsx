import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";

interface CurrentTeamData {
  id: string;
  name: string;
  division: string;
  level: string;
  gender: string;
}

const DashboardPage = (): JSX.Element => {
  const { teamId } = useParams<string>();
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;
  const [_currentTeam, setCurrentTeam] = useState<CurrentTeamData | {}>({});

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
