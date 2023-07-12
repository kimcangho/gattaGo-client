import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import { axiosAuth } from "../services/axios.service";
import useLogoutRedirect from "../hooks/useLogoutRedirect";

const LineupsPage = (): JSX.Element => {
  const [_lineups, setLineups] = useState({});
  const { teamId } = useParams<string>();
  const axiosPrivate = useAxiosPrivate();
  const redirectPage = useLogoutRedirect("login");

  useEffect(() => {
    const getLineups = async () => {
      try {
        const { data }: any = await axiosPrivate.get(
          `/teams/${teamId}/lineups`
        );
        setLineups(data);
      } catch (err) {
        console.log(err);
        await axiosAuth.delete(`/logout`, {
          withCredentials: true,
        });
        redirectPage();
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
