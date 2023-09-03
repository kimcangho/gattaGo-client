import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";

import LoadingSpinner from "../components/LoadingSpinner";
import EmptyRaceDay from "../components/EmptyRaceDay";

interface RegattaData {}

const RaceDayPage = () => {
  const [myRegattas, setMyRegattas] = useState<RegattaData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId, teamId } = useParams();
  // const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    const getAllRegattas = async () => {
      try {
        // const { data } = await axiosPrivate.get(`/regattas`);
        setMyRegattas([]);
        setIsLoading(false);
      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    getAllRegattas();
  }, []);
  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : myRegattas.length === 0 ? (
        <EmptyRaceDay userId={userId} teamId={teamId} />
      ) : (
        <div>Schedule Page</div>
      )}
    </div>
  );
};

export default RaceDayPage;
