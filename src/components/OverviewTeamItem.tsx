import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import boatIcon from "../assets/icons/boat.svg";
import editIcon from "../assets/icons/edit-entity.svg";
import deleteIcon from "../assets/icons/delete-entity.svg";
import { TeamData } from "../interfaces/EntityData";

interface OverviewTeamProps {
  id: string;
  name: string;
  eligibility: string;
  level: string;
  division: string;
  myTeams: TeamData[];
  setMyTeams: React.Dispatch<React.SetStateAction<TeamData[]>>;
}

const OverviewTeamItem = ({
  id,
  name,
  eligibility,
  level,
  division,
  myTeams,
  setMyTeams,
}: OverviewTeamProps): JSX.Element => {
  const { userId, setCurrentTeamName }: AuthContextTypes =
    useContext(AuthContext)!;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logoutRedirect = useLogoutRedirect();

  const redirectTeamPage = async () => {
    setCurrentTeamName(name);
    navigate(`../${userId}/roster/${id}`);
  };

  const handleEditTeam = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const { id } = event.target as HTMLInputElement;
    setCurrentTeamName(name);
    navigate(`../${userId}/edit/${id}`);
  };

  const handleDeleteTeam = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    try {
      const { id } = event.target as HTMLInputElement;
      await axiosPrivate.delete(`/teams/${id}`, {
        withCredentials: true,
      });
      const currentTeams = myTeams.filter((team: TeamData) => {
        return team.id !== id;
      });
      setMyTeams(currentTeams);
    } catch (err) {
      console.log(err);
      logoutRedirect("/login");
    }
  };

  return (
    <article
      id={id}
      className="flex justify-between space-x-2 items-center h-12 p-2 tablet:p-6 bg-white border-x border-b border-gray-border hover:bg-gray-border rounded-b"
    >
      <div className="flex w-full">
        <div
          onClick={redirectTeamPage}
          className="flex items-center space-x-2 tablet:space-x-6 tablet:w-[40%] cursor-pointer"
        >
          <img
            src={boatIcon}
            alt="Team Logo Placeholder"
            className="h-8 tablet:h-10"
          />

          <h4 className="truncate tablet:text-xl">{name}</h4>
        </div>
        <div className="flex flex-row flex-wrap text-black">
          <h3 className="tablet:inline-block mobile:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
            {eligibility}
          </h3>
          <h3 className="tablet:inline-block mobile:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
            {level}
          </h3>
          <h3 className="tablet:inline-block mobile:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
            {division}
          </h3>
        </div>
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
    </article>
  );
};
export default OverviewTeamItem;
