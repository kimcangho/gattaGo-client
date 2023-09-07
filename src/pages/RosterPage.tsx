import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, ChangeEvent } from "react";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import { motion, useIsPresent } from "framer-motion";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosPrivate from "../hooks/usePrivateInterceptors";
import useLogoutRedirect from "../hooks/useLogoutRedirect";
import RosterItem from "../components/RosterItem";
import { RosterData } from "../interfaces/EntityData";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import chevronUpIcon from "../assets/icons/chevron-up.svg";
import { filterFlagsObj } from "../data/filterFlagsObj";
import { paddlerSkillsArr } from "../data/paddlerSkillsArr";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { convertPaddlerSkillToField } from "../utils/convertPaddlerSkillToField";
import EmptyAthlete from "../components/EmptyAthlete";
import LoadingSpinner from "../components/LoadingSpinner";
import userIcon from "../assets/icons/user-filled.svg";

const RosterPage = (): JSX.Element => {
  const { userId, teamId } = useParams<string>();
  const { currentTeamDetails }: AuthContextTypes = useContext(AuthContext)!;

  const [roster, setRoster] = useState<RosterData[]>([]);
  const [sortableRoster, setSortableRoster] = useState<RosterData[]>([]);
  const [isNameOrderDesc, setIsNameOrderDesc] = useState<boolean>(false);
  const [isWeightOrderDesc, setIsWeightOrderDesc] = useState<boolean>(false);
  const [isFilterPanelVisible, setIsFilterPanelVisible] =
    useState<boolean>(false);
  const [filterFlags, setFilterFlags] = useState<any>(filterFlagsObj);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { width } = useWindowSize();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logoutRedirect = useLogoutRedirect();
  const isPresent = useIsPresent();

  useEffect(() => {
    const getAthletes = async () => {
      try {
        const { data } = await axiosPrivate.get(`/teams/${teamId}/athletes`);
        setRoster(data);
        setSortableRoster(data);
        setIsLoading(false);
      } catch (err: unknown) {
        console.log(err);
        logoutRedirect("/login");
      }
    };

    getAthletes();
  }, []);

  useEffect(() => {
    if (!Object.values(filterFlags).includes(true)) {
      setSortableRoster(roster);
    } else {
      setSortableRoster(
        roster
          .filter((paddler) => {
            //  Filter by availability
            if (!filterFlags.isAvailable && !filterFlags.isUnavailable)
              return true;
            if (paddler.athlete.isAvailable && filterFlags.isAvailable)
              return true;
            if (!paddler.athlete.isAvailable && filterFlags.isUnavailable)
              return true;
            return false;
          })
          .filter((paddler) => {
            //  Filter by eligibility
            if (!filterFlags.isOpen && !filterFlags.isWomen) return true;
            if (paddler.athlete.eligibility === "O" && filterFlags.isOpen)
              return true;
            if (paddler.athlete.eligibility === "W" && filterFlags.isWomen)
              return true;
            return false;
          })
          .filter((paddler) => {
            //  Filter by paddle side
            if (
              !filterFlags.isLeft &&
              !filterFlags.isRight &&
              !filterFlags.isBoth &&
              !filterFlags.isNone
            )
              return true;
            if (paddler.athlete.paddleSide === "L" && filterFlags.isLeft)
              return true;
            if (paddler.athlete.paddleSide === "R" && filterFlags.isRight)
              return true;
            if (paddler.athlete.paddleSide === "B" && filterFlags.isBoth)
              return true;
            if (paddler.athlete.paddleSide === "N/A" && filterFlags.isNone)
              return true;
          })
          .filter((paddler: any) => {
            const newFlags = {
              ...filterFlags,
              isAvailable: false,
              isUnavailable: false,
              isOpen: false,
              isWomen: false,
              isLeft: false,
              isRight: false,
              isBoth: false,
              isNone: false,
            };

            let flag = false;
            const foundFlags: string[] = Object.keys(newFlags).filter(
              (flag) => {
                if (newFlags[flag] === true) return flag;
              }
            );

            if (foundFlags.length === 0) return true;

            foundFlags.forEach((foundFlag: string) => {
              if (
                newFlags[foundFlag] &&
                paddler.athlete.paddlerSkills[0][foundFlag]
              ) {
                flag = true;
              }
            });

            return flag;
          })
      );
    }
  }, [filterFlags]);

  const editAthlete = async (athleteId: string) => {
    navigate(`/${userId}/roster/${teamId}/edit/${athleteId}`);
  };

  const deleteAthlete = async (athleteId: string) => {
    try {
      await axiosPrivate.delete(`/athletes/${athleteId}`, {
        withCredentials: true,
      });
      const rosterAfterDelete = roster.filter((data) => {
        return athleteId !== data.athleteId;
      });

      setRoster(rosterAfterDelete);
      setSortableRoster(rosterAfterDelete);
    } catch (err: unknown) {
      console.log(err);
      logoutRedirect("/login");
    }
  };

  //  Sorting

  const handleSortByName = async () => {
    setIsNameOrderDesc((prev) => !prev);
    setSortableRoster((prevRoster) =>
      prevRoster
        .sort((a, b) => {
          if (a.athlete.firstName! > b.athlete.firstName!)
            return isNameOrderDesc ? -1 : 1;
          if (a.athlete.firstName! < b.athlete.firstName!)
            return isNameOrderDesc ? 1 : -1;
          return 0;
        })
        .map((paddler) => paddler)
    );
  };

  const handleSortByWeight = async () => {
    setIsWeightOrderDesc((prev) => !prev);
    setSortableRoster((prevRoster) =>
      prevRoster
        .sort((a, b) => {
          if (a.athlete.weight! > b.athlete.weight!)
            return isWeightOrderDesc ? -1 : 1;
          if (a.athlete.weight! < b.athlete.weight!)
            return isWeightOrderDesc ? 1 : -1;
          return 0;
        })
        .map((paddler) => paddler)
    );
  };

  //  Filtering

  const handleToggleFilterPanel = () => {
    setIsFilterPanelVisible((prev) => !prev);
  };

  const handleSetFilterFlags = async (
    event: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const { checked, value } = event!.target;

    switch (value) {
      //  Availability
      case "filter-available":
        setFilterFlags({
          ...filterFlags,
          isAvailable: checked,
        });
        break;
      case "filter-unavailable":
        setFilterFlags({
          ...filterFlags,
          isUnavailable: checked,
        });
        break;
      //  Eligibility
      case "filter-open":
        setFilterFlags({
          ...filterFlags,
          isOpen: checked,
        });
        break;
      case "filter-women":
        setFilterFlags({
          ...filterFlags,
          isWomen: checked,
        });
        break;
      //  PaddleSide
      case "filter-left":
        setFilterFlags({
          ...filterFlags,
          isLeft: checked,
        });
        break;
      case "filter-right":
        setFilterFlags({
          ...filterFlags,
          isRight: checked,
        });
        break;
      case "filter-both":
        setFilterFlags({
          ...filterFlags,
          isBoth: checked,
        });
        break;
      case "filter-none":
        setFilterFlags({
          ...filterFlags,
          isNone: checked,
        });
        break;
      default:
        break;
    }
  };

  const handleSetSkillFlags = async (
    event: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const { checked, value } = event!.target;

    setFilterFlags({
      ...filterFlags,
      [value]: checked,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : roster.length === 0 ? (
        <EmptyAthlete userId={userId} teamId={teamId} />
      ) : (
        <>
          <div className="flex flex-wrap justify-between items-center max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] mx-auto my-4 tablet:mb-0 overflow-hidden">
            <div className="mb-4">
              <h1>Roster</h1>
              <p className="text-black">
                {`Total: ${!roster.length ? "-" : roster?.length} paddler${
                  roster.length !== 1 ? `s` : ""
                }`}
              </p>
            </div>

            <Link
              to={`../${userId}/roster/${teamId}/new`}
              className="flex bg-green-light hover:bg-green-dark p-2 rounded border border-green-dark text-white items-center"
            >
              {width! >= 768 && <p className="mr-2">Create Athlete</p>}
              <p className="font-bold">+</p>
              <img src={userIcon} alt="Add User" className="h-6" />
            </Link>
          </div>

          {/* Filter Panel */}
          <>
            <div
              className={`flex flex-col mb-4 p-2 tablet:p-6 max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] mx-auto bg-white border border-gray-border rounded-t w-full shadow-sm`}
            >
              <div
                onClick={handleToggleFilterPanel}
                className="flex space-x-2 cursor-pointer w-fit"
              >
                <h3 className="text-blue-light">Filter Panel</h3>
                {isFilterPanelVisible ? (
                  <img src={chevronUpIcon} alt="Chevron Up" className="w-4" />
                ) : (
                  <img
                    src={chevronDownIcon}
                    alt="Chevron Down"
                    className="w-4"
                  />
                )}
              </div>

              {isFilterPanelVisible && (
                <motion.div
                  layout={false}
                  style={{ position: isPresent ? "static" : "absolute" }}
                  initial={{ opacity: 0 }}
                  animate={isPresent ? { opacity: 1 } : { opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 50,
                    mass: 1,
                  }}
                >
                  <h3 className="text-black mt-2">General</h3>
                  <div className="w-full flex flex-wrap tablet:flex-nowrap">
                    {/* Availability */}
                    <div className="flex flex-col w-[50%] mb-4">
                      <h3>Status</h3>
                      <div className="flex">
                        <input
                          type="checkbox"
                          id="filter-available"
                          value="filter-available"
                          onChange={handleSetFilterFlags}
                          checked={filterFlags.isAvailable}
                          className="mr-2 tablet:mr-4"
                        />
                        <label htmlFor="filter-available" className="truncate">
                          Available
                        </label>
                      </div>
                      <div className="flex">
                        <input
                          type="checkbox"
                          id="filter-unavailable"
                          value="filter-unavailable"
                          onChange={handleSetFilterFlags}
                          checked={filterFlags.isUnavailable}
                          className="mr-2 tablet:mr-4"
                        />
                        <label
                          htmlFor="filter-unavailable"
                          className="truncate"
                        >
                          Unavailable
                        </label>
                      </div>
                    </div>

                    {/* Eligibility */}
                    <div className="flex flex-col w-[50%] mb-4">
                      <h3>Eligibility</h3>
                      <div className="flex">
                        <input
                          type="checkbox"
                          id="filter-open"
                          value="filter-open"
                          onChange={handleSetFilterFlags}
                          checked={filterFlags.isOpen}
                          className="mr-2 tablet:mr-4"
                        />
                        <label htmlFor="filter-open">Open</label>
                      </div>
                      <div className="flex">
                        <input
                          type="checkbox"
                          id="filter-women"
                          value="filter-women"
                          onChange={handleSetFilterFlags}
                          checked={filterFlags.isWomen}
                          className="mr-2 tablet:mr-4"
                        />
                        <label htmlFor="filter-women">Women</label>
                      </div>
                    </div>

                    {/* Paddle Side */}
                    <div className="flex flex-col w-[50%] mb-4">
                      <h3>Paddle Side</h3>
                      <div className="flex">
                        <input
                          type="checkbox"
                          id="filter-left"
                          value="filter-left"
                          onChange={handleSetFilterFlags}
                          checked={filterFlags.isLeft}
                          className="mr-2 tablet:mr-4"
                        />
                        <label htmlFor="filter-left">Left</label>
                      </div>
                      <div className="flex">
                        <input
                          type="checkbox"
                          id="filter-right"
                          value="filter-right"
                          onChange={handleSetFilterFlags}
                          checked={filterFlags.isRight}
                          className="mr-2 tablet:mr-4"
                        />
                        <label htmlFor="filter-right">Right</label>
                      </div>
                      <div className="flex">
                        <input
                          type="checkbox"
                          id="filter-both"
                          value="filter-both"
                          onChange={handleSetFilterFlags}
                          checked={filterFlags.isBoth}
                          className="mr-2 tablet:mr-4"
                        />
                        <label htmlFor="filter-both">Both</label>
                      </div>
                      <div className="flex">
                        <input
                          type="checkbox"
                          id="filter-none"
                          value="filter-none"
                          onChange={handleSetFilterFlags}
                          checked={filterFlags.isNone}
                          className="mr-2 tablet:mr-4"
                        />
                        <label htmlFor="filter-none">None</label>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-black mt-2">Paddle Skills</h3>{" "}
                  <div className="flex flex-wrap tablet:flex-nowrap">
                    {paddlerSkillsArr.map(({ category, fields }, index) => {
                      return (
                        <div className="w-[50%] flex flex-col" key={index}>
                          <h3 className="w-full">
                            {capitalizeFirstLetter(
                              convertPaddlerSkillToField(category, 0)
                            )}
                          </h3>
                          {fields.map((skill, index) => {
                            return (
                              <div key={index} className="mr-2">
                                <input
                                  type="checkbox"
                                  id={`paddlerSkills-${skill}`}
                                  value={skill}
                                  onChange={handleSetSkillFlags}
                                  checked={filterFlags[skill]}
                                  className="mr-2 tablet:mr-4"
                                />
                                <label htmlFor={`paddlerSkills-${skill}`}>
                                  {convertPaddlerSkillToField(skill, 2)}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </>

          {roster.length !== 0 && (
            <motion.div
              layout={false}
              key="filterPanel"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 50,
                mass: 1,
              }}
            >
              <div className="hidden bg-gray-border tablet:flex w-full max-w-[1280px] mx-auto py-2 justify-between text-black font-semibold border border-b-0 border-black rounded-t-md">
                <div className="flex flex-row w-[448px] pl-16">
                  <div
                    onClick={handleSortByName}
                    className="w-auto mr-[70px] flex space-x-2 items-center cursor-pointer"
                  >
                    <h2>Name</h2>
                    <span>&#8645;</span>
                  </div>
                  <h2 className="mx-2">Status</h2>
                  <h2 className="w-auto mx-3.5">Side</h2>
                  <h2 className="mx-2">Elig.</h2>
                  <h2
                    onClick={handleSortByWeight}
                    className="ml-2.5 mr-2 cursor-pointer text-center"
                  >
                    Wt. {` `}
                    <span>&#8645;</span>
                  </h2>
                </div>
                <h2 className="self-start">Skills</h2>
                <h2 className="w-[142px] text-center">Edit / Delete</h2>
              </div>

              <div className="tablet:border-x tablet:border-b border-black rounded-b-md max-w-[1280px] mx-auto">
                {sortableRoster.map((paddler) => {
                  return (
                    <motion.div
                      layout={false}
                      style={{ position: isPresent ? "static" : "absolute" }}
                      key={paddler.athleteId}
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
                      <RosterItem
                        key={paddler.athleteId}
                        athleteId={paddler.athleteId}
                        athlete={paddler.athlete}
                        width={width}
                        deleteAthlete={deleteAthlete}
                        editAthlete={editAthlete}
                        currentTeamDetails={currentTeamDetails}
                        isWomenIneligible={
                          currentTeamDetails?.eligibility === "Women" &&
                          paddler.athlete.eligibility !== "W"
                            ? true
                            : false
                        }
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default RosterPage;
