import emptyLowLevelIcon from "../assets/icons/empty-low-level.svg";
import { Link } from "react-router-dom";

interface EmptyAthleteProps {
  userId?: string;
  teamId?: string;
}

const EmptyAthlete = ({ userId, teamId }: EmptyAthleteProps) => {
  return (
    <div className="flex flex-col items-center tablet:max-w-[448px] mx-auto">
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        Looks like we're low on paddlers...
      </h3>
      <img src={emptyLowLevelIcon} alt="Low Level" className="max-w-[240px] opacity-75 mt-4 tablet:mt-8" />
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        ...you can create a new paddler{" "}
        <span>
          <Link
            to={`../${userId}/roster/${teamId}/new`}
            className="underline decoration-2 text-green-light hover:text-green-dark"
          >
            here!
          </Link>
        </span>
      </h3>
    </div>
  );
};

export default EmptyAthlete;
