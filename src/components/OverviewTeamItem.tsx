import { useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import boatIcon from "../assets/icons/boat.svg";
import editIcon from "../assets/icons/edit-entity.svg";
import deleteIcon from "../assets/icons/delete-entity.svg";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";

interface OverviewTeamProps {
  id: string;
  name: string;
  myTeams: any;
  setMyTeams: any;
}

export interface TeamData {
  id: string;
  name: string;
  division: string;
  level: string;
  gender: string;
}

const OverviewTeamItem = ({
  id,
  name,
  myTeams,
  setMyTeams,
}: OverviewTeamProps): JSX.Element => {
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;

  const navigate: NavigateFunction = useNavigate();

  const handleEditTeam = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const { id } = event.target as HTMLInputElement;
    navigate(`../test/dashboard/${id}`);
  };

  const handleDeleteTeam = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const headers = { Authorization: `Bearer ${accessToken}` };

    const { id } = event.target as HTMLInputElement;
    await axios.delete(`http://localhost:8888/teams/${id}`, {
      headers,
      withCredentials: true,
    });
    const currentTeams = myTeams.filter((team: TeamData) => {
      return team.id !== id;
    });

    setMyTeams(currentTeams);
  };

  return (
    <div
      id={id}
      className="flex justify-between space-x-2 items-center h-12 p-2 tablet:p-6 bg-white border-x border-b border-gray-border hover:bg-blue-wavy rounded-b"
    >
      <div className="flex items-center space-x-2 tablet:space-x-6">
        <img
          src={boatIcon}
          alt="Team Logo Placeholder"
          className="h-8 tablet:h-10"
        />
        <h4 className="truncate tablet:text-xl">{name}</h4>
      </div>
      <div className="flex items-center space-x-2">
        <img
          src={editIcon}
          alt="Edit Team"
          className="h-6 tablet:h-8 cursor-pointer"
          id={id}
          onClick={handleEditTeam}
        />
        <img
          src={deleteIcon}
          alt="Delete Team"
          className="h-6 tablet:h-8 cursor-pointer"
          id={id}
          onClick={handleDeleteTeam}
        />
      </div>
    </div>
  );
};
export default OverviewTeamItem;
