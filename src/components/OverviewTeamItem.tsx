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
    // <article
    //   id={id}
    //   className="flex justify-between space-x-2 items-center h-12 p-2 tablet:p-6 bg-white border-x border-b border-gray-border hover:bg-gray-border rounded-b shadow-lg tablet:shadow-none"
    //   // className={`tablet:flex mx-auto
    //   // tablet:mx-0 max-w-[448px] tablet:max-w-full desktop:max-w-[1280px]
    //   // border tablet:border-0 tablet:border-t border-black mb-4 tablet:mb-0 pb-2
    //   // tablet:pb-0 rounded-xl tablet:rounded-none items-center hover:bg-gray-border`}
    // >
    //   <div className="flex w-full">
    //     <div
    //       onClick={redirectTeamPage}
    //       className="flex items-center space-x-2 tablet:space-x-6 tablet:w-[40%] cursor-pointer"
    //     >
    //       <img
    //         src={boatIcon}
    //         alt="Team Logo Placeholder"
    //         className="h-8 tablet:h-10"
    //       />

    //       <h4 className="truncate tablet:text-xl">{name}</h4>
    //     </div>
    //     <div className="flex flex-row flex-wrap text-black">
    //       <h3 className="tablet:inline-block mobile:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
    //         {eligibility}
    //       </h3>
    //       <h3 className="tablet:inline-block mobile:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
    //         {level}
    //       </h3>
    //       <h3 className="tablet:inline-block mobile:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
    //         {division}
    //       </h3>
    //     </div>
    //   </div>
    //   <div className="flex items-center space-x-2">
    //     <img
    //       src={editIcon}
    //       alt="Edit Team"
    //       className="h-6 tablet:h-8 cursor-pointer"
    //       id={id}
    //       onClick={handleEditTeam}
    //     />
    //     <img
    //       src={deleteIcon}
    //       alt="Delete Team"
    //       className="h-6 tablet:h-8 cursor-pointer"
    //       id={id}
    //       onClick={handleDeleteTeam}
    //     />
    //   </div>
    // </article>

    //  New article

    <article
      key={id}
      className={`shadow-lg tablet:shadow-none tablet:flex mx-auto tablet:mx-0 w-full max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] border tablet:border-0 tablet:border-t border-black mb-4 tablet:mb-0 pb-2 tablet:pb-0 rounded-xl tablet:rounded-none items-center hover:bg-gray-border`}
    >
      <div className="flex justify-between w-full bg-gray-border tablet:bg-inherit border-b border-black tablet:border-none rounded-t-xl">
        <div
          onClick={redirectTeamPage}
          className="flex items-center m-2 space-x-2 w-[calc(100%-88px)] tablet:w-[200px] cursor-pointer"
        >
          <img
            src={boatIcon}
            alt="Team Logo Placeholder"
            className="h-8 tablet:h-10"
          />
          <h3 className="text-blue-light truncate midMobile:w-full">{name}</h3>
        </div>

        <div className="flex m-3 w-12 tablet:hidden">
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

        {/* <div className="hidden tablet:flex items-center tablet:w-[100px]">
          <h3 className="m-2.5 text-center w-4 text-black">{eligibility}</h3>
          <h3 className="text-center w-8 ml-[26px] text-black">
            {eligibility}
          </h3>
        </div> */}
      </div>

      <div className="flex flex-wrap justify-start mt-3.5 tablet:mt-0 p-1 text-black w-[calc(100%-80px)] w-full tablet:w-full">
        <h3 className="inline-block tablet:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-1 mb-2 tablet:mt-2 font-normal">
          {eligibility}
        </h3>
        <h3 className="inline-block tablet:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-1 mb-2 tablet:mt-2 font-normal">
          {level}
        </h3>
        <h3 className="inline-block tablet:hidden bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-1 mb-2 tablet:mt-2 font-normal">
          {division}
        </h3>
      </div>

      <div
        // className={`flex pl-2 rounded-b-xl tablet:w-auto justify-center ${
        //   !isNotesVisible ? `justify-between` : `flex-col tablet:flex-row`
        // } `}
        className={`flex pl-2 rounded-b-xl tablet:w-auto justify-center`}
      >
        {/* <div className="flex space-x-1 items-center tablet:w-[108px]">
          
        </div> */}

        <div className="tablet:flex justify-end hidden">
          <img
            src={editIcon}
            alt="Edit"
            // onClick={() => handleEditAthlete(athleteId)}
            // className={`ml-2 mr-1 ${
            //   isNotesVisible ? `mt-1 tablet:mt-0` : ``
            // } w-6 cursor-pointer`}
            className={`ml-2 mr-1  w-6 cursor-pointer`}
          />
          <img
            src={deleteIcon}
            alt="Delete"
            // id={athlete?.id}
            // onClick={() => handleDeleteAthlete(athleteId)}
            // className={`ml-1 mr-2 ${
            //   isNotesVisible && `mt-1 tablet:mt-0`
            // } w-6 cursor-pointer`}
            className={`ml-1 mr-2 w-6 cursor-pointer`}
          />
        </div>
      </div>
    </article>
  );
};
export default OverviewTeamItem;
