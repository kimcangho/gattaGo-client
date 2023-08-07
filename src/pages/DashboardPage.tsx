import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";

const DashboardPage = (): JSX.Element => {
  const { teamId } = useParams();
  const [teamOverview, setTeamOverview] = useState<any>({});
  const [teamLineups, setTeamLineups] = useState([]);
  const [teamAthletes, setTeamAthletes] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    try {
      console.log(teamId);
      const getTeamDetails = async () => {
        const { data } = await axiosPrivate.get(`/teams/${teamId}`);
        const { team, lineups, athletes } = data;

        console.log(team);
        setTeamOverview(team);
        setTeamLineups(lineups);
        setTeamAthletes(athletes);
      };

      getTeamDetails();
    } catch (err) {
      console.log(err);
      logoutRedirect("/login");
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center desktop:max-w-[1280px] mx-auto my-2 overflow-hidden">
      <div className="text-center">
        <h1>{teamOverview?.name}</h1>
      </div>

      <div className="flex flex-col p-2 midMobile:pb-0 mb-2 tablet:p-6 desktop:max-w-[1280px] mx-auto bg-white border border-gray-border rounded-t w-full">
        <h3 className="text-blue-light">Team Overview</h3>
        <p>Division: {teamOverview.division}</p>
        <p>Eligibility: {teamOverview.eligibility}</p>
        <p>Level: {teamOverview.level}</p>
      </div>

      <div className="flex flex-col p-2 mb-2 tablet:p-6 desktop:max-w-[1280px] mx-auto bg-white border border-gray-border rounded-t w-full">
        <h3 className="text-blue-light">Lineups</h3>
        <p>
          {teamLineups.length + " "}Lineup{teamLineups.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col p-2 mb-2 tablet:p-6 desktop:max-w-[1280px] mx-auto bg-white border border-gray-border rounded-t w-full">
        <h3 className="text-blue-light">Athletes</h3>
        <p>
          {teamAthletes.length + " "}Paddler
          {teamAthletes.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
