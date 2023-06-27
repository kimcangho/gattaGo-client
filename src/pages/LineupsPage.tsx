import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

const LineupsPage = () => {
  const { teamId } = useParams();
  const { accessToken }: any = useContext(AuthContext);

  useEffect(() => {
    const getLineups = async () => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data } = await axios.get(
        `http://localhost:8888/teams/${teamId}/lineups`,
        {
          headers,
          withCredentials: true,
        }
      );
      console.log(data);
    };

    getLineups();
  }, []);

  return <div>LineupsPage</div>;
};

export default LineupsPage;
