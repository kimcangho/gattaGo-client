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
  index: number;
  name: string;
  eligibility: string;
  level: string;
  division: string;
  myTeams: TeamData[];
  setMyTeams: React.Dispatch<React.SetStateAction<TeamData[]>>;
}

const OverviewTeamItem = ({
  id,
  index,
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
      key={id}
      className={`shadow-lg tablet:shadow-none mx-auto w-full max-w-[448px] tablet:max-w-[768px] border tablet:border-t-0 border-black mb-4 tablet:mb-0 rounded-xl tablet:rounded-none ${
        index === myTeams.length - 1 ? "tablet:rounded-b-md" : ""
      } items-center`}
    >
      <div className="flex items-center bg-gray-border tablet:bg-inherit border-b tablet:border-b-0 border-black rounded-t-xl tablet:rounded-t-none">
        <div className="flex items-center m-2 tablet:mx-0 space-x-2 tablet:space-x-4 w-[calc(100%-88px)] tablet:w-[45rem] truncate">
          <img
            src={boatIcon}
            alt="Team Logo Placeholder"
            className="h-8 tablet:h-10 tablet:ml-2"
          />
          <h3
            onClick={redirectTeamPage}
            className="text-blue-light truncate midMobile:w-full cursor-pointer hover:underline decoration-2"
          >
            {name}
          </h3>
        </div>

        <div className="hidden tablet:flex w-72">
          <h3 className="text-center w-24 text-black font-normal">
            {eligibility}
          </h3>
          <h3 className="text-center w-24 text-black font-normal">{level}</h3>
          <h3 className="text-center w-24 text-black font-normal">
            {division}
          </h3>
        </div>

        <div className="flex justify-center items-center m-2 space-x-2 tablet:mx-0 tablet:w-[14rem]">
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

      <div className="flex flex-wrap tablet:hidden justify-start mt-2 tablet:mt-0 p-1 text-black w-full">
        <h3 className="bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-1 mb-2 tablet:mt-2 font-normal">
          {eligibility}
        </h3>
        <h3 className="bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-1 mb-2 tablet:mt-2 font-normal">
          {level}
        </h3>
        <h3 className="bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-1 mb-2 tablet:mt-2 font-normal">
          {division}
        </h3>
      </div>
    </article>
  );
};
export default OverviewTeamItem;
