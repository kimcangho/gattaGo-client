import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";

interface RosterItemProps {
  athleteId: string;
}

interface AthleteData {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  paddleSide: string;
  email: string;
  isAvailable: boolean;
  isManager: boolean;
  notes: string;
  phone: string;
  weight: number;
  birthDate: Date;
}

const RosterItem = ({ athleteId }: RosterItemProps): JSX.Element => {
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;
  const [athlete, setAthlete] = useState<AthleteData | null>(null);

  useEffect(() => {
    const getAthleteDetails = async () => {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` };
        const { data } = await axios.get(
          `http://localhost:8888/athletes/${athleteId}`,
          {
            headers,
            withCredentials: true,
          }
        );
        setAthlete(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAthleteDetails();
  }, []);

  return (
    <div className="mx-auto desktop:max-w-[1280px] border p-2">
      <p>{athlete?.firstName}</p>
    </div>
  );
};

export default RosterItem;
