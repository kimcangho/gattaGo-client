import { AthleteData } from "../interfaces/EntityData";
import dragRightIcon from "../assets/icons/drag-right.svg";

interface LineupAthleteItemProps {
  athleteId: string;
  athlete: AthleteData;
}

const LineupAthleteItem = ({ athlete, athleteId }: LineupAthleteItemProps) => {
  return (
    <article
      id={athleteId}
      className="flex justify-between h-12 p-2 tablet:p-6 bg-white border border-gray-border hover:bg-blue-wavy"
    >
      <div className="flex items-center tablet:space-x-6 max-w-[40%]">
        <h3 className="text-blue-light truncate max-w-full">
          {athlete?.firstName} {athlete?.lastName.slice(0, 1)}.{" "}
        </h3>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex text-black font-bold w-30">
          <p className="inline-block bg-gray-border px-2 rounded-3xl mx-2 my-2 tablet:mt-2 text-center">{athlete.paddleSide}</p>
          <p className="inline-block bg-green-light px-2 rounded-3xl m-2 tablet:mt-2 text-center">{athlete.eligibility}</p>
          <img
            src={dragRightIcon}
            alt="Drag Right"
            className="w-6 mx-2 rounded-xl cursor-grab hover:bg-gray-border"
          />
        </div>
      </div>
    </article>
  );
};

export default LineupAthleteItem;
