import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import createNew from "../assets/icons/create-new.svg";
import OverviewTeamItem from "../components/OverviewTeamItem";
import { TeamData } from "../interfaces/EntityData";

const OverviewPage = (): JSX.Element => {
  const [myTeams, setMyTeams] = useState<TeamData[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate: NavigateFunction = useNavigate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    const getAllTeams = async () => {
      try {
        const { data } = await axiosPrivate.get("/teams", {
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
    navigate("../:userId/new");
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

      <div
        className="tablet:hidden flex space-x-2 tablet:space-x-6 items-center p-2 tablet:px-6 bg-white border-x border-b border-gray-border hover:bg-green-light rounded-b cursor-pointer"
        onClick={handleCreateTeam}
      >
        <img
          src={createNew}
          alt="Create New Team"
          className="h-6 tablet:h-10"
        />
        <h4 className="tablet:text-xl">Create new team</h4>
      </div>
    </div>
  );
};

export default OverviewPage;
