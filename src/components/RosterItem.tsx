import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext, { AuthContextTypes } from "../contexts/AuthContext";
import userProfileIcon from "../assets/icons/user-profile.svg";
import checkCircleIcon from "../assets/icons/check-circle.svg";
import xCircleIcon from "../assets/icons/x-circle.svg";
import leftHandUnfilledIcon from "../assets/icons/left-hand-unfilled.svg";
import leftHandFilledIcon from "../assets/icons/left-hand-filled.svg";
import rightHandUnfilledIcon from "../assets/icons/right-hand-unfilled.svg";
import rightHandFilledIcon from "../assets/icons/right-hand-filled.svg";
import chevronDownIcon from "../assets/icons/chevron-down.svg";
import chevronUpIcon from "../assets/icons/chevron-up.svg";
import editIcon from "../assets/icons/edit-entity.svg";
import deleteIcon from "../assets/icons/delete-entity.svg";

interface RosterItemProps {
  athleteId: string;
  roster: RosterData[];
  setRoster: React.Dispatch<React.SetStateAction<RosterData[]>>;
}

interface RosterData {
  teamId: string;
  athleteId: string;
  updatedAt: Date;
}

interface AthleteData {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  paddleSide: string;
  notes: string;
  isAvailable: boolean;
  email: string;
  isManager: boolean;
  phone: string;
  weight: number;
  birthDate: Date;
}

const RosterItem = ({
  athleteId,
  roster,
  setRoster,
}: RosterItemProps): JSX.Element => {
  const { accessToken }: AuthContextTypes = useContext<AuthContextTypes | null>(
    AuthContext
  )!;
  // const [isEditable, setIsEditable] = useState<boolean>(false);   //  toggle to edit item
  const [athlete, setAthlete] = useState<AthleteData | null>(null);
  const [isNotesVisible, setIsNotesVisible] = useState<boolean>(false);

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

  const handleToggleNotes = () => {
    setIsNotesVisible((isNotesVisible) => !isNotesVisible);
  };

  const handleDeleteAthlete = async (event: React.MouseEvent<HTMLElement>) => {
    const headers = { Authorization: `Bearer ${accessToken}` };

    const { id } = event.target as HTMLInputElement;
    await axios.delete(`http://localhost:8888/athletes/${id}`, {
      headers,
      withCredentials: true,
    });
    const currentRoster = roster.filter(({ athleteId }) => {
      return athleteId !== id;
    });

    setRoster(currentRoster);
  };

  const handleEditAthlete = async () => {
    console.log("Edit");
  };

  return (
    <article
      className={`tablet:flex mx-auto max-w-[448px] tablet:max-w-full desktop:max-w-[1280px] border tablet:border-t-0 border-black mb-4 tablet:mb-0 pb-2 tablet:pb-0 rounded-xl tablet:rounded-none items-center hover:bg-gray-border`}
    >
      <div className="flex justify-between bg-gray-border tablet:bg-inherit border-b border-black tablet:border-none rounded-t-xl">
        <div className="flex items-center tablet:justify-between m-2 space-x-2 tablet:w-48">
          <img
            src={athlete?.isAvailable ? checkCircleIcon : xCircleIcon}
            alt={athlete?.isAvailable ? "Available" : "Unavailable"}
            className="w-6 tablet:w-8 tablet:mr-1"
          />
          <h3 className="text-blue-light tablet:order-first">
            {athlete?.firstName} {athlete?.lastName.slice(0, 1)}.{" "}
          </h3>
        </div>
        <div className="flex m-2 w-12">
          <img
            src={
              athlete?.paddleSide === "L" || athlete?.paddleSide === "B"
                ? leftHandFilledIcon
                : leftHandUnfilledIcon
            }
            alt={
              athlete?.paddleSide === "L" || athlete?.paddleSide === "B"
                ? "Left Side Filled"
                : "Left Side Unfilled"
            }
            className="w-6"
          />
          <img
            src={
              athlete?.paddleSide === "R" || athlete?.paddleSide === "B"
                ? rightHandFilledIcon
                : rightHandUnfilledIcon
            }
            alt={
              athlete?.paddleSide === "R" || athlete?.paddleSide === "B"
                ? "Right Side Filled"
                : "Right Side Unfilled"
            }
            className="w-6"
          />
        </div>
      </div>

      <img
        src={userProfileIcon}
        alt="Placeholder Profile Picture"
        className="inline-block tablet:order-first w-[20%] tablet:w-10 tablet:ml-2 align-top my-2"
      />

      <div className="inline-block justify-start tablet:flex tablet:flex-wrap mt-3.5 tablet:mt-0 p-2 text-black w-[80%] tablet:w-full">
        <p className="inline-block bg-blue-wavy px-2 py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
          {athlete!.weight < 200 ? "Big Boi" : "Smol"}
        </p>
        <p className="inline-block bg-blue-wavy px-2 py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
          {athlete?.lastName}
        </p>
        <p className="inline-block bg-blue-wavy px-2 py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
          {athlete?.gender}
        </p>
        <p className="inline-block bg-blue-wavy px-2 py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
          {athlete?.phone}
        </p>
        <p className="inline-block bg-blue-wavy px-2 py-1 rounded-3xl mx-2 mb-2 tablet:mt-2">
          {athlete?.firstName}
        </p>
        
      </div>

      <div
        className={`flex pl-2 rounded-b-xl ${
          !isNotesVisible ? `justify-between` : `flex-col `
        } tablet:w-auto tablet:justify-start`}
      >
        <div className="flex space-x-1 items-center tablet:w-[108px]">
          <span
            onClick={handleToggleNotes}
            className="flex space-x-1 items-center cursor-pointer"
          >
            <h4>Notes</h4>
            <img
              src={isNotesVisible ? chevronUpIcon : chevronDownIcon}
              alt={isNotesVisible ? "Chevron Up" : "Chevron Down"}
              className="w-4"
            />
          </span>
        </div>
        {isNotesVisible && <p>{athlete?.notes}</p>}
        <div className="flex justify-end">
          <img
            src={editIcon}
            alt="Edit"
            onClick={handleEditAthlete}
            className={`ml-2 mr-1 ${
              isNotesVisible ? `mt-1` : ``
            } w-6 cursor-pointer`}
          />
          <img
            src={deleteIcon}
            alt="Delete"
            id={athlete?.id}
            onClick={handleDeleteAthlete}
            className={`ml-1 mr-2 ${
              isNotesVisible && `mt-1`
            } w-6 cursor-pointer`}
          />
        </div>
      </div>
    </article>
  );
};

export default RosterItem;
