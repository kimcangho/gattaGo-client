import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

const RosterPage = () => {
  const { teamId } = useParams();
  const { accessToken }: any = useContext(AuthContext);

  useEffect(() => {
    const getAthletes = async () => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data } = await axios.get(
        `http://localhost:8888/teams/${teamId}/athletes`,
        {
          headers,
          withCredentials: true,
        }
      );
      console.log(data);
    };

    getAthletes();
  }, []);

  return <div>RosterPage</div>;
};

export default RosterPage;
