import emptyIcon from "../assets/icons/empty.svg";
import { Link } from "react-router-dom";

interface EmptyAthleteProps {
  userId?: string;
  teamId?: string;
}

const EmptyAthlete = ({ userId, teamId }: EmptyAthleteProps) => {
  return (
    <div className="flex flex-col items-center tablet:max-w-[448px] mx-auto">
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        Looks like it's been awhile...
      </h3>
      <img src={emptyIcon} alt="Empty" className="max-w-[240px] opacity-75"/>
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        ...time to create a new paddler{" "}
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
