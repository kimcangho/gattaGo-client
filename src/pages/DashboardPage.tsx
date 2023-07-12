import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import { TeamData } from "../interfaces/EntityData";

const DashboardPage = (): JSX.Element => {
  const { teamId } = useParams();
  const { accessToken }: AuthContextTypes = useContext(AuthContext)!;
  const [_currentTeam, setCurrentTeam] = useState<TeamData | {}>({});
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    try {
      const getTeam = async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const { data } = await axiosPrivate.get(`/teams/${teamId}`, {
          headers,
          withCredentials: true,
        });
        const { id, name, division, level, eligibility } = data;
        setCurrentTeam({ id, name, division, level, eligibility });
      };

      getTeam();
    } catch (err) {
      console.log(err);
      logoutRedirect("/login");
    }
  }, []);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
