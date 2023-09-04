import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import boatIcon from "../assets/icons/boat.svg";
import printIcon from "../assets/icons/print.svg";
import deleteIcon from "../assets/icons/delete-entity.svg";
import { RaceDayData } from "../interfaces/EntityData";

interface RaceDayItemProps {
  index: number;
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  myRaceDays: RaceDayData[];
  setMyRaceDays: any;
}

const RaceDayItem = ({
  index,
  id,
  name,
  startDate,
  endDate,
  location,
  myRaceDays,
  setMyRaceDays,
}: RaceDayItemProps): JSX.Element => {
  const { userId }: AuthContextTypes =
    useContext(AuthContext)!;
  const [isSending, setIsSending] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logoutRedirect = useLogoutRedirect();

  const redirectRaceDayPlanPage = async () => {
    // setCurrentTeamDetails({ name, eligibility, division });
    navigate(`../${userId}/dashboard/${id}`);
  };

  const handleEditRaceDayPlan = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    console.log("Export race day plan..."); //  Export function to be determined
    if (isSending) return;
    // const { id } = event.target as HTMLInputElement;
    // navigate(`../${userId}/edit/${id}`);
  };

  const handleDeleteRaceDayPlan = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    console.log("Deleting race plan...");
    if (isSending) return;
    // try {
    //   setIsSending(true);
    //   const { id } = event.target as HTMLInputElement;
    //   await axiosPrivate.delete(`/teams/${id}`);
    //   const currentRaceDays = myRaceDays.filter((raceDay: RaceDayData) => {
    //     return raceDay.id !== id;
    //   });
    //   setMyRaceDays(currentRaceDays);
    // } catch (err: unknown) {
    //   console.log(err);
    //   logoutRedirect("/login");
    // }
  };

  return (
    <article
      key={id}
      className={`shadow-lg tablet:shadow-none mx-auto w-full max-w-[448px] tablet:max-w-[768px] border tablet:border-t-0 border-black mb-4 tablet:mb-0 rounded-md tablet:rounded-none
      ${index === myRaceDays.length - 1 ? "tablet:rounded-b-md" : ""}
      items-center`}
    >
      <div className="flex items-center bg-gray-border tablet:bg-inherit border-b tablet:border-b-0 border-black rounded-t-md tablet:rounded-t-none">
        <div className="flex items-center m-2 tablet:mx-0 space-x-2 tablet:space-x-4 w-[calc(100%-88px)] tablet:w-[45rem] truncate">
          <img
            src={boatIcon}
            alt="Team Logo Placeholder"
            className="h-8 tablet:h-10 tablet:ml-2"
          />

          <h3
            onClick={redirectRaceDayPlanPage}
            className="text-blue-light truncate cursor-pointer hover:underline decoration-2"
          >
            {name}
          </h3>
        </div>

        <div className="hidden items-center tablet:flex w-72">
          <h3 className="text-center w-36 text-black font-normal">
            {location}
          </h3>
          <h3 className="text-center w-36 text-black font-normal">
            {startDate} - {endDate}
          </h3>
        </div>

        <div className="flex justify-center items-center m-2 space-x-2 tablet:mx-0 tablet:w-[14rem]">
          {!isSending ? (
            <>
              <img
                src={printIcon}
                alt="Edit Team"
                className="h-6 tablet:h-8 cursor-pointer"
                id={id}
                // onClick={handleExportRaceDayPlan}
              />
              <img
                src={deleteIcon}
                alt="Delete Team"
                className="h-6 tablet:h-8 cursor-pointer"
                id={id}
                // onClick={handleDeleteRaceDayPlan}
              />
            </>
          ) : (
            <h2>Deleting...</h2>
          )}
        </div>
      </div>

      <div className="flex flex-wrap tablet:hidden justify-start mt-2 tablet:mt-0 p-1 text-black w-full">
        <h3 className="bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-1 mb-2 tablet:mt-2 font-normal">
          {location}
        </h3>
        <h3 className="bg-gray-border tablet:bg-blue-wavy px-2 tablet:py-1 rounded-3xl mx-1 mb-2 tablet:mt-2 font-normal">
          {startDate} - {endDate}
        </h3>
      </div>
    </article>
  );
};
export default RaceDayItem;
