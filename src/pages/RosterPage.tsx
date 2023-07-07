import {
  useParams,
  Link,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useWindowSize from "../hooks/useWindowSize";
import axios from "axios";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import RosterItem from "../components/RosterItem";
import { RosterData } from "../interfaces/EntityData";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import chevronUpIcon from "../assets/icons/chevron-up.svg";
// import { paddlerSkillsArr } from "../data/paddlerSkillsArr";
// import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
// import { convertPaddlerSkillToField } from "../utils/convertPaddlerSkillToField";

const RosterPage = (): JSX.Element => {
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;
  const [roster, setRoster] = useState<RosterData[]>([]);
  const [sortableRoster, setSortableRoster] = useState<RosterData[]>([]);
  const [isNameOrderDesc, setIsNameOrderDesc] = useState<boolean>(false);
  const [isWeightOrderDesc, setIsWeightOrderDesc] = useState<boolean>(false);
  const [isFilterPanelVisible, setIsFilterPanelVisible] =
    useState<boolean>(false);
  const { teamId } = useParams<string>();
  const navigate: NavigateFunction = useNavigate();
  const { width } = useWindowSize();

  const [availabilityFilter, setAvailabilityFilter] = useState({
    isAvailable: false,
    isUnavailable: false,
  });

  useEffect(() => {
    const getAthletes = async () => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const { data } = await axios.get(
          `http://localhost:8888/teams/${teamId}/athletes`,
          {
            headers,
            withCredentials: true,
          }
        );
        setRoster(data);
        setSortableRoster(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAthletes();
  }, []);

  //  Filter useEffects
  useEffect(() => {
    if (
      (availabilityFilter.isAvailable && availabilityFilter.isUnavailable) ||
      (!availabilityFilter.isAvailable && !availabilityFilter.isUnavailable)
    ) {
      setSortableRoster(roster);
    } else {
      setSortableRoster((prevRoster) =>
        prevRoster.filter((a) => {
          if (availabilityFilter.isAvailable) return a.athlete.isAvailable;
          return a.athlete.isAvailable === false;
        })
      );
    }
  }, [availabilityFilter]);

  //  CRUD Operations

  const handleEditAthlete = async (athleteId: string) => {
    navigate(`/:userId/roster/${teamId}/edit/${athleteId}`);
  };

  const handleDeleteAthlete = async (athleteId: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };

    await axios.delete(`http://localhost:8888/athletes/${athleteId}`, {
      headers,
      withCredentials: true,
    });
    const rosterAfterDelete = roster.filter((data) => {
      return athleteId !== data.athleteId;
    });

    setRoster(rosterAfterDelete);
    setSortableRoster(rosterAfterDelete);
  };

  //  Sorting

  const handleSortByName = async () => {
    setIsNameOrderDesc((prev) => !prev);
    setSortableRoster((prevRoster) =>
      prevRoster
        .sort((a, b) => {
          if (a.athlete.firstName > b.athlete.firstName)
            return isNameOrderDesc ? -1 : 1;
          if (a.athlete.firstName < b.athlete.firstName)
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
          if (a.athlete.weight > b.athlete.weight)
            return isWeightOrderDesc ? -1 : 1;
          if (a.athlete.weight < b.athlete.weight)
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

  const handleFilterByAvailability = async (event: any) => {
    const { checked, value } = event.target;

    if (value === "filter-available")
      setAvailabilityFilter({
        ...availabilityFilter,
        isAvailable: checked,
      });

    if (value === "filter-unavailable") {
      setAvailabilityFilter({
        ...availabilityFilter,
        isUnavailable: checked,
      });
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] mx-auto my-4 tablet:mb-0 overflow-hidden">
        <div className="mb-4">
          <h1>Roster</h1>
          <p className="text-black">
            Total: {roster.length} paddler{roster.length !== 1 && `s`}
          </p>
        </div>

        <Link
          to={`../:userId/roster/${teamId}/new`}
          className="bg-green-light hover:bg-green-dark p-2 rounded border border-green-dark text-white"
        >
          Add Paddler
        </Link>
      </div>

      {/* Filter Panel */}

      <div className="flex flex-col p-2 tablet:p-6 desktop:max-w-[1280px] mx-auto bg-white border border-gray-border rounded-t w-full">
        <label
          htmlFor=""
          onClick={handleToggleFilterPanel}
          className="flex space-x-2 my-4"
        >
          <h3 className="text-blue-light">Filter Panel</h3>
          {isFilterPanelVisible ? (
            <img src={chevronDownIcon} alt="Chevron Down" className="w-4" />
          ) : (
            <img src={chevronUpIcon} alt="Chevron Up" className="w-4" />
          )}
        </label>

        {isFilterPanelVisible && (
          <div className="w-full flex">
            {/* Availability */}
            <div className="flex flex-col w-[50%]">
              <p>Status</p>
              <div>
                <input
                  type="checkbox"
                  id="filter-available"
                  value="filter-available"
                  onChange={handleFilterByAvailability}
                  checked={availabilityFilter.isAvailable}
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="filter-available">Available</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="filter-unavailable"
                  value="filter-unavailable"
                  onChange={handleFilterByAvailability}
                  checked={availabilityFilter.isUnavailable}
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="filter-unavailable">Unavailable</label>
              </div>
            </div>

            {/* Eligibility */}
            <div className="flex flex-col w-[50%]">
              <p>Eligibility</p>
              <div>
                <input
                  type="checkbox"
                  id="filter-available"
                  value="filter-available"
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="filter-available">Open</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="filter-unavailable"
                  value="filter-unavailable"
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="filter-unavailable">Women</label>
              </div>
            </div>

            {/* Paddle Side */}
            <div className="flex flex-col w-[50%]">
              <p>Paddle Side</p>
              <div>
                <input
                  type="checkbox"
                  id="filter-available"
                  value="filter-available"
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="filter-available">Left</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="filter-unavailable"
                  value="filter-unavailable"
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="filter-unavailable">Right</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="filter-unavailable"
                  value="filter-unavailable"
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="filter-unavailable">Both</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="filter-unavailable"
                  value="filter-unavailable"
                  className="mr-2 tablet:mr-4"
                />
                <label htmlFor="filter-unavailable">None</label>
              </div>
            </div>
          </div>
        )}
        {/* {isFilterPanelVisible &&
          paddlerSkillsArr.map(({ category, fields }, index) => {
            return (
              <div className="w-[50%] mb-4 flex" key={index}>
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
          })} */}
      </div>

      {roster.length !== 0 && (
        <>
          <div className="hidden bg-gray-border tablet:flex w-full max-w-[1280px] mx-auto py-2 justify-between text-black font-semibold border border-b-0 border-black rounded-t-xl">
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

          <div className="tablet:border-x tablet:border-b border-black rounded-b-2xl max-w-[1280px] mx-auto">
            {sortableRoster.map((paddler) => {
              return (
                <RosterItem
                  key={paddler.athleteId}
                  athleteId={paddler.athleteId}
                  athlete={paddler.athlete}
                  width={width}
                  handleDeleteAthlete={handleDeleteAthlete}
                  handleEditAthlete={handleEditAthlete}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default RosterPage;
