import emptyDesertIcon from "../assets/icons/empty-desert.svg";
import { Link } from "react-router-dom";

interface EmptyTeamProps {
  userId?: string;
}

const EmptyTeam = ({ userId }: EmptyTeamProps) => {
  return (
    <div className="flex flex-col items-center tablet:max-w-[448px] mx-auto">
      <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
        Looks a little barren around these parts...
      </h3>
      <img src={emptyDesertIcon} alt="Empty Desert" className="max-w-[240px] opacity-75"/>
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
    </div>
  );
};

export default EmptyTeam;
