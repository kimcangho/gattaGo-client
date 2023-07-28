import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import OverviewTeamItem from "../components/OverviewTeamItem";
import { TeamData } from "../interfaces/EntityData";

const OverviewPage = (): JSX.Element => {
  const [myTeams, setMyTeams] = useState<TeamData[]>([]);
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate: NavigateFunction = useNavigate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    const getAllTeams = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${userId}`, {
          withCredentials: true,
        });
        setMyTeams(data);
      } catch (err) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    getAllTeams();
  }, []);

  const handleCreateTeam = () => {
    navigate(`../${userId}/new`);
  };

  return (
    <div className="p-2 tablet:p-4 desktop:w-[1280px] desktop:mx-auto flex flex-col">
      <div className="flex justify-between items-center text-center p-2 tablet:p-6 bg-white border border-gray-border rounded-t w-full">
        <h1 className="tablet:text-4xl">My Teams</h1>
        <h2
          className="tablet:block border border-green-dark rounded p-2 text-white bg-green-light hover:bg-green-dark cursor-pointer text-xs tablet:text-lg tablet:font-normal"
          onClick={handleCreateTeam}
        >
          Create New Team
        </h2>
      </div>

      {myTeams.map((team) => {
        return (
          <OverviewTeamItem
            key={team.id}
            id={team.id}
            name={team.name}
            myTeams={myTeams}
            setMyTeams={setMyTeams}
          />
        );
      })}
    </div>
  );
};

export default OverviewPage;
