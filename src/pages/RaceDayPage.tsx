import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";

import LoadingSpinner from "../components/LoadingSpinner";
import EmptyRaceDay from "../components/EmptyRaceDay";
import RaceDayItem from "../components/RaceDayItem";

import { RaceDayData } from "../interfaces/EntityData";

const RaceDayPage = () => {
  const [myRaceDays, setMyRaceDays] = useState<RaceDayData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId, teamId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();

  useEffect(() => {
    const getAllRegattas = async () => {
      try {
        const { data } = await axiosPrivate.get(`teams/${teamId}/raceDayPlans`);
        //  NOTE: should sort by ascending date.
        // setMyRaceDays([
        //   {
        //     id: "test1",
        //     name: "Pickering",
        //     startDate: new Date("2012-01-26"),
        //     endDate: new Date("2012-01-26"),
        //     location: "Pickering, ON",
        //   },
        //   {
        //     id: "test2",
        //     name: "Woodstock",
        //     startDate: new Date("2012-01-26"),
        //     endDate: new Date("2012-01-26"),
        //     location: "Woodstock, ON",
        //   },
        // ]); //  hard code with sample data until API call built in
        setMyRaceDays(data);
        setIsLoading(false);
      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    getAllRegattas();
  }, []);
  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : myRaceDays.length === 0 ? (
        <EmptyRaceDay userId={userId} teamId={teamId} />
      ) : (
        <div className="desktop:mx-auto p-2">
          <div className="flex justify-between items-center mx-auto max-w-[448px] tablet:max-w-[768px] my-4 tablet:mb-4 overflow-hidden">
            <div>
              <h1>Race Day Plans</h1>
              <p className="text-black">
                {`
            Total: ${!myRaceDays.length ? "-" : myRaceDays?.length} team${
                  myRaceDays?.length !== 1 ? `s` : ""
                }`}
              </p>
            </div>

            <Link
              to={`../${userId}/race_day/${teamId}/plan`} //  Team Race Day Plan page to be built
              className="bg-green-light hover:bg-green-dark p-2 rounded border border-green-dark text-white"
            >
              Create Race Plan
            </Link>
          </div>

          <div className="hidden bg-gray-border tablet:flex w-full mx-auto tablet:max-w-[768px] py-2 text-black font-semibold border border-b border-black rounded-t-md">
            <div className="flex flex-row w-full">
              <h2 className="w-[15rem] flex space-x-2 items-center ml-16">
                Select Plan
              </h2>
            </div>

            <div className="flex text-center w-72">
              <h2 className="w-36">Location</h2>
              <h2 className="w-36">Date(s)</h2>
            </div>

            <div className="flex w-[15rem] justify-center">
              <h2 className="text-center">Print / Delete</h2>
            </div>
          </div>
          <div className="desktop:w-[1280px] desktop:mx-auto flex flex-col">
            {myRaceDays.map((raceDay, index) => {
              return (
                <div>
                  <RaceDayItem
                    key={raceDay.id}
                    index={index}
                    id={raceDay.id}
                    name={raceDay.name}
                    startDate={raceDay.startDate}
                    endDate={raceDay.endDate}
                    location={raceDay.location}
                    myRaceDays={myRaceDays}
                    setMyRaceDays={setMyRaceDays}
                    teamId={teamId}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RaceDayPage;
