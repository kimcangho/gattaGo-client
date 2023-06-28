import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import RosterItem from "../components/RosterItem";

interface AuthContextData {
  accessToken: string;
}

interface RosterData {
  teamId: string;
  athleteId: string;
  updatedAt: Date;
}

const RosterPage = () => {
  const { teamId } = useParams();
  const { accessToken }: AuthContextData = useContext(AuthContext)!;
  const [roster, setRoster] = useState<RosterData[]>([]);

  useEffect(() => {
    const getAthletes = async () => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const { data } = await axios.get(
          `http://localhost:8888/teams/${teamId}/athletes`,
          {
            headers,
            withCredentials: true,
          }
        );

        // const athleteIdData = await data.map(
        //   (athlete: { athleteId: string; teamId: string; updatedAt: Date }) =>
        //     athlete.athleteId
        // );
        console.log(data);
        setRoster(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAthletes();
  }, []);

  return (
    <>
      {roster.map((athlete) => {
        return (
          <RosterItem key={athlete.athleteId} athleteId={athlete.athleteId} />
        );
      })}
    </>
  );
};

export default RosterPage;
