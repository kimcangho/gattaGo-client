import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import { axiosAuth } from "../services/axios.service";

const LineupsPage = (): JSX.Element => {
  const { setIsLoggedIn, setAccessToken }: AuthContextTypes =
    useContext<AuthContextTypes | null>(AuthContext)!;
  const [_lineups, setLineups] = useState({});
  const { teamId } = useParams<string>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

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
        setAccessToken("");
        setIsLoggedIn(false);
        navigate("/login");
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
