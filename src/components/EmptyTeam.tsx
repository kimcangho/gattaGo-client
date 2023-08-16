import { useState } from "react";
import emptyDesertIcon from "../assets/icons/empty-desert.svg";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../services/axios.service";

interface EmptyTeamProps {
  userId?: string;
  setMyTeams: any;
}

const EmptyTeam = ({ userId, setMyTeams }: EmptyTeamProps) => {
  const [isSending, setIsSending] = useState<boolean>(false);

  const generateTeam = async () => {
    try {
      setIsSending(true);
      const { data } = await axiosPrivate.post(
        `/teams/user/${userId}/generateFullTeam`,
        { userId }
      );
      setMyTeams(data);
      setIsSending(false);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center tablet:max-w-[448px] mx-auto">
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        Looks a little barren around these parts...
      </h3>
      <img
        src={emptyDesertIcon}
        alt="Empty Desert"
        className="max-w-[240px] opacity-75"
      />
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        ...time to create a new team{" "}
        <span>
          <Link
            to={`../${userId}/new`}
            className="underline decoration-2 text-green-light hover:text-green-dark"
          >
            here!
          </Link>
        </span>
      </h3>
      <h3 className="text-center max-w-[320px] tablet:max-w-[448px] mx-2.5 tablet:mx-5 tablet:mb-5 tablet:text-2xl">
        Short on time? Generate a team with athletes and lineups below!
      </h3>
      <div
        onClick={generateTeam}
        className={`p-4 my-4 max-w-[320px] tablet:max-w-[448px] text-white  ${
          isSending
            ? "opacity-50 cursor-wait"
            : "hover:bg-green-dark cursor-pointer"
        } bg-green-light rounded`}
      >
        {!isSending ? "Generate Team" : "Generating..."}
      </div>
    </div>
  );
};

export default EmptyTeam;
