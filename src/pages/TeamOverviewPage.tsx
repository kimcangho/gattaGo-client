import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import OverviewTeamItem from "../components/OverviewTeamItem";
import { TeamData } from "../interfaces/EntityData";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import useWindowSize from "../hooks/useWindowSize";
import rosterFilledIcon from "../assets/icons/roster-filled.svg";
import EmptyTeam from "../components/EmptyTeam";
import LoadingSpinner from "../components/LoadingSpinner";

const TeamOverviewPage = (): JSX.Element => {
  const [myTeams, setMyTeams] = useState<TeamData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const logoutRedirect = useLogoutRedirect();
  const isPresent = useIsPresent();
  const { width } = useWindowSize();

  useEffect(() => {
    const getAllTeams = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/user/${userId}`);
        setMyTeams(data);
        setIsLoading(false);
      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    getAllTeams();
  }, []);

  const convertSeniorDivisionString = (division: string) => {
    switch (division) {
      case "seniora":
        return "senior A";
      case "seniorb":
        return "senior B";
      case "seniorc":
        return "senior C";
      default:
        return division;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isPresent ? { opacity: 1 } : { opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : myTeams.length === 0 ? (
        <EmptyTeam userId={userId} setMyTeams={setMyTeams} />
      ) : (
        <div className="desktop:mx-auto p-2">
          <div className="flex justify-between items-center mx-auto max-w-[448px] tablet:max-w-[768px] my-4 tablet:mb-4 overflow-hidden">
            <div>
              <h1>Teams</h1>
              <p className="text-black">
                {`
            Total: ${!myTeams.length ? "-" : myTeams?.length} team${
                  myTeams?.length !== 1 ? `s` : ""
                }`}
              </p>
            </div>

            <Link
              to={`../${userId}/new`}
              className="flex bg-green-light hover:bg-green-dark p-2 rounded border border-green-dark text-white items-center"
            >
              {width! >= 768 && <p className="mr-2">Create Team </p>}
              <p className="font-bold">+</p>
              <img src={rosterFilledIcon} alt="Add Team" className="h-6" />
            </Link>
          </div>

          <div className="hidden bg-gray-border tablet:flex w-full mx-auto tablet:max-w-[768px] py-2 text-black font-semibold border border-b border-black rounded-t-md">
            <div className="flex flex-row w-full">
              <h2 className="w-[15rem] flex space-x-2 items-center ml-16">
                Select Team
              </h2>
            </div>

            <div className="flex text-center w-72">
              <h2 className="w-24">Eligibility</h2>
              <h2 className="w-24">Level</h2>
              <h2 className="w-24">Division</h2>
            </div>

            <div className="flex w-[15rem] justify-center">
              <h2 className="text-center">Edit / Delete</h2>
            </div>
          </div>
          <div className="desktop:w-[1280px] desktop:mx-auto flex flex-col">
            <AnimatePresence>
              {myTeams.map((team, index) => {
                return (
                  <motion.div
                    layout
                    style={{ position: isPresent ? "static" : "absolute" }}
                    key={team.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 50,
                      mass: 1,
                    }}
                  >
                    <OverviewTeamItem
                      key={team.id}
                      id={team.id}
                      name={team.name}
                      index={index}
                      eligibility={capitalizeFirstLetter(team.eligibility)}
                      level={capitalizeFirstLetter(team.level)}
                      division={capitalizeFirstLetter(
                        convertSeniorDivisionString(team.division)
                      )}
                      myTeams={myTeams}
                      setMyTeams={setMyTeams}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TeamOverviewPage;