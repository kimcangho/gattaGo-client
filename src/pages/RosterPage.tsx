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
import ascendingIcon from "../assets/icons/ascending.svg";
import descendingIcon from "../assets/icons/descending.svg";

const RosterPage = (): JSX.Element => {
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;
  const [roster, setRoster] = useState<RosterData[]>([]);
  const [isNameOrderDesc, setIsNameOrderDesc] = useState<boolean>(false);
  const { teamId } = useParams<string>();
  const navigate: NavigateFunction = useNavigate();
  const { width } = useWindowSize();

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
      } catch (err) {
        console.log(err);
      }
    };

    getAthletes();
  }, []);

  const handleEditAthlete = async (athleteId: string) => {
    navigate(`/:userId/roster/${teamId}/edit/${athleteId}`);
  };

  const handleDeleteAthlete = async (athleteId: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };

    await axios.delete(`http://localhost:8888/athletes/${athleteId}`, {
      headers,
      withCredentials: true,
    });
    const currentRoster = roster.filter((data) => {
      return athleteId !== data.athleteId;
    });

    setRoster(currentRoster);
  };

  const handleSortByName = async () => {
    setIsNameOrderDesc((prev) => !prev);
    setRoster((prevRoster) =>
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

  const handleSortByAvailability = () => {
    setRoster((prevRoster) =>
      prevRoster
        .sort((a) => {
          if (a.athlete.isAvailable) return 1;
          return -1;
        })
        .map((paddler) => paddler)
    );
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

      {roster.length !== 0 && (
        <>
          <div className="hidden bg-gray-border tablet:flex w-full max-w-[1280px] mx-auto py-2 justify-between text-black font-semibold border border-b-0 border-black rounded-t-xl">
            <div className="flex flex-row w-[320px]">
              <div
                onClick={handleSortByName}
                className="w-full flex space-x-2 items-center cursor-pointer"
              >
                <h2 className="ml-16">Name</h2>
                <img
                  src={isNameOrderDesc ? descendingIcon : ascendingIcon}
                  alt={isNameOrderDesc ? "Descending Order" : "Ascending Order"}
                  className="w-6"
                />
              </div>
              <h2 onClick={handleSortByAvailability} className="mx-2">
                Status
              </h2>
              <h2 className="w-auto mx-3.5">Side</h2>
            </div>
            <h2 className="self-start">Description / Skills</h2>
            <h2 className="w-[142px] text-center">Edit / Delete</h2>
          </div>

          <div className="tablet:border-x tablet:border-b border-black rounded-b-2xl max-w-[1280px] mx-auto">
            {roster.map((paddler) => {
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
