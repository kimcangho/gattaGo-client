import { AthleteData } from "../interfaces/EntityData";
import { convertPaddlerSkillToField } from "../utils/convertPaddlerSkillToField";
import dragRightIcon from "../assets/icons/drag-right.svg";
import dragLeftIcon from "../assets/icons/drag-left.svg";
import noAccessIcon from "../assets/icons/no-access.svg";

interface LineupAthleteItemProps {
  athleteId: string;
  athlete: AthleteData;
  width: number | undefined;
}

const LineupAthleteItem = ({
  athlete,
  athleteId,
  width,
}: LineupAthleteItemProps) => {
  return (
    <article
      id={athleteId}
      className={`flex justify-between p-2 border border-gray-border max-w-full ${
        !athlete.isAvailable && "bg-red-light"
      }`}
    >
      <div className="flex items-center tablet:space-x-2 max-w-[calc(100%-3.5rem)] tablet:max-w-full text-black font-bold">
        {width! >= 768 && (
          <img
            src={athlete.isAvailable ? dragLeftIcon : noAccessIcon}
            alt={athlete.isAvailable ? "Drag Left" : "No Access"}
            className={`flex justify-center items-center w-12 h-12 p-2 border rounded-lg ${
              athlete.isAvailable
                ? "border-gray-border hover:bg-blue-wavy cursor-grab"
                : "border-red-light over:bg-red-light cursor-not-allowed"
            } `}
          />
        )}
        <div className="flex-col">
          <h3 className="text-blue-light truncate max-w-full">
            {athlete?.firstName} {athlete?.lastName}
          </h3>
          <div className="flex space-x-2 items-center">
            <p className="inline-block bg-gray-border px-2 rounded-3xl my-2 text-center h-fit">
              {athlete.paddleSide}
            </p>
            <p className="inline-block bg-green-light px-2 rounded-3xl text-center h-fit">
              {athlete.eligibility}
            </p>
            <p className="inline-block bg-orange-light px-2 rounded-3xl text-center h-fit">
              {athlete.weight}
            </p>
          </div>
        </div>

        {width! >= 448 && (
          <div className="flex justify-start items-center overflow-auto">
            {athlete.paddlerSkills &&
              //  @ts-ignore
              Object.entries(athlete.paddlerSkills[0])
                .filter(([key, value]) => {
                  return value && key !== "id" && key !== "athleteId";
                })
                .map(([key]) => {
                  return (
                    <p className="font-normal inline-block bg-blue-wavy px-2 py-1 rounded-3xl mx-2 text-center break-keep">
                      {convertPaddlerSkillToField(key, 2)}
                    </p>
                  );
                })}
          </div>
        )}
      </div>

      <div className="flex text-black font-bold items-center">
        {width! < 768 && (
          <div
            className={`flex justify-center items-center w-12 h-12 p-2 border rounded-lg ${
              athlete.isAvailable
                ? "border-gray-border hover:bg-blue-wavy cursor-grab"
                : "border-red-light cursor-not-allowed"
            } `}
          >
            <img
              src={athlete.isAvailable ? dragRightIcon : noAccessIcon}
              alt={athlete.isAvailable ? "Drag Right" : "No Access"}
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </article>
  );
};

export default LineupAthleteItem;
