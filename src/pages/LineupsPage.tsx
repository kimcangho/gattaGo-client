import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";

const LineupsPage = (): JSX.Element => {
  const [lineups, setLineups] = useState({});
  const { teamId } = useParams<string>();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    const getLineups = async () => {
      try {
        const { data }: any = await axiosPrivate.get(
          `/teams/${teamId}/lineups`
        );
        setLineups(data);
      } catch (err: any) {
        logoutRedirect("/login");
        //  To-do: explore useLocation with useNavigate
      }
    };
    getLineups();
  }, []);

  return (
    <div>
      <h2>Lineups</h2>
    </div>
  );
};

export default LineupsPage;
