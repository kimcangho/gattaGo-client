import { useState, useEffect } from "react";
import axios from "axios";
import boatIcon from "../assets/icons/boat.svg";
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

  const handleCreateTeam = async () => {
    //  To-do: Navigate to create team page
    console.log("Creating a new team...");
  };

  const handleSelectTeam = (event: any) => {
    //  To-do: Link to team dashboard by id
    console.log(event.currentTarget.id);
  };

  return (
    <>
      <div className="p-4 flex flex-col">
        <div className="text-center p-2 bg-white border border-gray-border rounded-t w-full">
          <h1>My Teams</h1>
          {/* <h2 className="border rounded p-2 hover:text-white hover:bg-gray-light cursor-pointer">
            New Team
          </h2> */}
        </div>

        {myTeams.map((team) => {
          return (
            <div
              key={team.id}
              id={team.id}
              onClick={handleSelectTeam}
              className="flex space-x-2 items-center h-12 p-2 bg-white border-x border-b border-gray-border hover:bg-blue-wavy rounded-b cursor-pointer"
            >
              <img src={boatIcon} className="h-8" />
              <h4>{team.name}</h4>
            </div>
          );
        })}

        <div
          className="flex space-x-2 items-center h-12 p-2 bg-white border-x border-b border-gray-border hover:bg-green-light rounded-b cursor-pointer"
          onClick={handleCreateTeam}
        >
          <img src={createNew} alt="Create New Team" className="h-full" />
          <h4>Create new team</h4>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
