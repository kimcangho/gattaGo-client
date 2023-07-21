import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";

const DashboardPage = (): JSX.Element => {
  const { teamId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    try {
      const getTeam = async () => {
        await axiosPrivate.get(`/teams/${teamId}`, {
          withCredentials: true,
        });
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
