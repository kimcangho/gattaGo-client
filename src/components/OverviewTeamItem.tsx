import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import boatIcon from "../assets/icons/boat.svg";
import editFilledIcon from "../assets/icons/edit-entity.svg";
import editUnfilledIcon from "../assets/icons/edit.svg";
import deleteFilledIcon from "../assets/icons/delete-entity.svg";
import deleteUnfilledIcon from "../assets/icons/delete.svg";
import { TeamData } from "../interfaces/EntityData";
import DeleteModal from "./DeleteModal";

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
  const { userId, setCurrentTeamDetails }: AuthContextTypes =
    useContext(AuthContext)!;
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isEditHovering, setIsEditHovering] = useState<boolean>(false);
  const [isDeleteHovering, setIsDeleteHovering] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const redirectTeamPage = async () => {
    setCurrentTeamDetails({ name, eligibility, division });
    navigate(`../${userId}/dashboard/${id}`);
  };

  const handleEditHover = () => {
    setIsEditHovering((prev) => !prev);
  };
  const handleDeleteHover = () => {
    setIsDeleteHovering((prev) => !prev);
  };

  const handleEditTeam = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (isSending) return;
    const { id } = event.target as HTMLInputElement;
    setCurrentTeamDetails({ name, eligibility, division });
    navigate(`../${userId}/edit/${id}`);
  };

  const handleModalVisibility = async () => {
    if (isSending) return;
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <article
        key={id}
        className={`shadow-lg tablet:shadow-none mx-auto w-full max-w-[448px] tablet:max-w-[768px] border tablet:border-t-0 border-black mb-4 tablet:mb-0 rounded-md tablet:rounded-none ${
          index === myTeams.length - 1 ? "tablet:rounded-b-md" : ""
        } items-center`}
      >
        <div className="flex items-center bg-gray-border tablet:bg-inherit border-b tablet:border-b-0 border-black rounded-t-md tablet:rounded-t-none">
          <div className="flex items-center m-2 tablet:mx-0 space-x-2 tablet:space-x-4 w-[calc(100%-88px)] tablet:w-[45rem] truncate">
            <img
              src={boatIcon}
              alt="Team Logo Placeholder"
              className="h-8 tablet:h-10 tablet:ml-2"
            />

            <h3
              onClick={redirectTeamPage}
              className="text-blue-light truncate cursor-pointer hover:underline decoration-2"
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
            {!isSending ? (
              <>
                <img
                  src={isEditHovering ? editFilledIcon : editUnfilledIcon}
                  alt="Edit Team"
                  onMouseEnter={handleEditHover}
                  onMouseLeave={handleEditHover}
                  className="h-6 tablet:h-8 cursor-pointer"
                  id={id}
                  onClick={handleEditTeam}
                />
                <img
                  src={isDeleteHovering ? deleteFilledIcon : deleteUnfilledIcon}
                  alt="Delete Team"
                  onMouseEnter={handleDeleteHover}
                  onMouseLeave={handleDeleteHover}
                  className="h-6 tablet:h-8 cursor-pointer"
                  id={id}
                  onClick={handleModalVisibility}
                />
              </>
            ) : (
              <h2>Deleting...</h2>
            )}
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
      {showModal && (
        <DeleteModal
          entityType="team"
          entityName={name}
          entityId={id}
          setShowModal={setShowModal}
          entityArray={myTeams}
          setEntityArray={setMyTeams}
          isSending={isSending}
          setIsSending={setIsSending}
        />
      )}
    </>
  );
};
export default OverviewTeamItem;
