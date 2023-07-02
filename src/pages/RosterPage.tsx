import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useWindowSize from "../hooks/useWindowSize";
import axios from "axios";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import RosterItem from "../components/RosterItem";

interface RosterData {
  teamId: string;
  athleteId: string;
  updatedAt: Date;
}

const RosterPage = (): JSX.Element => {
  const { teamId } = useParams<string>();
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;
  const [roster, setRoster] = useState<RosterData[]>([]);
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

  return (
    <>
      <div className="flex flex-wrap justify-between items-center max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] mx-auto my-4 tablet:mb-0">
        <div className="mb-4">
          <h1>Roster</h1>
          <p className="text-black">
            Total: {roster.length} paddler{roster.length !== 1 && `s`}
          </p>
        </div>

        <div className="bg-green-light hover:bg-green-dark p-2 rounded border border-green-dark text-white">
          Add Paddler
        </div>
      </div>

      <div className="hidden bg-gray-border tablet:flex w-full max-w-[1280px] mx-auto py-2 justify-between text-black font-semibold border border-b-0 border-black rounded-t-xl">
        <div className="flex flex-row w-[320px]">
          <h2 className="w-full pl-16">Name</h2>
          <h2 className="mx-2">Status</h2>
          <h2 className="w-auto mx-3.5">Side</h2>
        </div>
        <h2 className="self-start">Description</h2>
        <h2 className="w-[142px] text-center">Edit/Delete</h2>
      </div>

      <div className="tablet:border-x tablet:border-b border-black rounded-b-2xl">
        {roster.map((athlete) => {
          return (
            <RosterItem
              key={athlete.athleteId}
              athleteId={athlete.athleteId}
              roster={roster}
              setRoster={setRoster}
              width={width}
            />
          );
        })}
      </div>
    </>
  );
};

export default RosterPage;
