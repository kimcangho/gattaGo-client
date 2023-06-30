import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
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
        <div className="">
          <h1>Roster</h1>
          <p className="text-black">
            Total: {roster.length} paddler{roster.length !== 1 && `s`}
          </p>
        </div>

        <div className="bg-green-light hover:bg-green-dark p-2 rounded border border-green-dark text-white">
          Add Paddler
        </div>
      </div>

      <div className="hidden tablet:flex w-full max-w-[1280px] mx-auto justify-between text-black font-semibold border border-black rounded-t-xl">
        <div className="flex flex-row w-[320px]">
          <h2 className="w-full text-center">Name</h2>
          <h2 className="w-16 px-2">Status</h2>
          <h2 className="w-24 text-center">Side</h2>
        </div>
        <h2>Description</h2>
        <h2 className="w-[142px] text-center">Edit/Delete</h2>
      </div>

      <div className="">
        {roster.map((athlete) => {
          return (
            <RosterItem
              key={athlete.athleteId}
              athleteId={athlete.athleteId}
              roster={roster}
              setRoster={setRoster}
            />
          );
        })}
      </div>
    </>
  );
};

export default RosterPage;
