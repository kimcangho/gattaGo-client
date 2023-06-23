import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import boatIcon from "../assets/icons/boat.svg";
import editIcon from "../assets/icons/edit-entity.svg";
import deleteIcon from "../assets/icons/delete-entity.svg";
import createNew from "../assets/icons/create-new.svg";

interface TeamData {
  id: string;
  name: string;
  division: string;
  level: string;
  gender: string;
}

const OverviewPage = (): JSX.Element => {
  const [myTeams, setMyTeams] = useState<TeamData[]>([]);

  useEffect(() => {
    const getAllTeams = async () => {
      const { data } = await axios.get("http://localhost:8888/teams");
      console.log(data);
      setMyTeams(data);
    };

    getAllTeams();
  }, []);

  const navigate = useNavigate();

  const handleCreateTeam = async () => {
    //  To-do: Navigate to create team page
    console.log("Creating a new team...");
  };

  const handleSelectTeam = (event: any) => {
    //  To-do: Expand for team details  in mobile view
    console.log(event.currentTarget.id);
  };

  const handleEditTeam = (event: any) => {
    event.stopPropagation();
    navigate(`../${event.target.id}/dashboard`);
  };

  const handleDeleteTeam = (event: any) => {
    //  To-do: Delete team from DB
    event.stopPropagation();
    console.log(`Delete team: ${event.target.id}`);
    const currentTeams = myTeams.filter((team) => {
      return team.id !== event.target.id;
    });
    setMyTeams(currentTeams);
  };

  return (
    <>
      <div className="p-4 desktop:w-[1280px] desktop:mx-auto flex flex-col">
        <div className="flex justify-between items-center text-center p-2 tablet:p-6 bg-white border border-gray-border rounded-t w-full">
          <h1 className="tablet:text-4xl">My Teams</h1>
          <h2
            className="hidden tablet:block border-2 border-black rounded p-2 text-black hover:text-white hover:bg-gray-light tablet:text-2xl cursor-pointer"
            onClick={handleCreateTeam}
          >
            Create New Team
          </h2>
        </div>

        {myTeams.map((team) => {
          return (
            <div
              key={team.id}
              id={team.id}
              onClick={handleSelectTeam}
              className="flex justify-between space-x-2 items-center h-12 p-2 tablet:p-6 bg-white border-x border-b border-gray-border hover:bg-blue-wavy rounded-b cursor-pointer"
            >
              <div className="flex items-center space-x-2 tablet:space-x-6">
                <img
                  src={boatIcon}
                  alt="Team Logo Placeholder"
                  className="h-8 tablet:h-10"
                />
                <h4 className="truncate tablet:text-xl">{team.name}</h4>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src={editIcon}
                  alt="Edit Team"
                  className="h-6 tablet:h-8"
                  id={team.id}
                  onClick={handleEditTeam}
                />
                <img
                  src={deleteIcon}
                  alt="Delete Team"
                  className="h-6 tablet:h-8"
                  id={team.id}
                  onClick={handleDeleteTeam}
                />
              </div>
            </div>
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
    </>
  );
};

export default OverviewPage;
