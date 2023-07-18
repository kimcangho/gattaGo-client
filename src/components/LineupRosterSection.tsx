import LineupAthleteItem from "./LineupAthleteItem";
import { RosterData } from "../interfaces/EntityData";

interface LineupRosterSectionProps {
  rosterAthletes: RosterData[];
  width: number | undefined;
}

const LineupRosterSection = ({
  rosterAthletes,
  width,
}: LineupRosterSectionProps) => {
  return (
    <div
      onClick={(event) => {
        event?.stopPropagation();
      }}
      className="bg-white flex-1 inline-block border tablet:border-none border-gray-border shadow-md tablet:shadow-none fixed top-[7rem] left-0 tablet:static w-[calc(100%-1.5rem)] tablet:w-full h-[calc(90%-4rem-0.5px)] overflow-auto max-h-[80rem] p-2"
    >
      <div className="flex flex-col tablet:flex-row justify-between tablet:items-center">
        <div className="text-black mb-2">
          <h1>Roster</h1>
          <p className="text-black">
            Total: {rosterAthletes.length} paddler
            {rosterAthletes.length !== 1 && `s`}
          </p>
        </div>
        <div className="flex space-x-2 w-auto text-black font-bold mb-4">
          <p className="h-fit bg-gray-border rounded-3xl w-24 tablet:mt-2 text-center">
            Side
          </p>
          <p className="bg-green-light px-2 rounded-3xl tablet:mt-2 text-center h-fit">
            Eligibility
          </p>
          <p className="bg-orange-light px-2 rounded-3xl tablet:mt-2 text-center h-fit">
            Weight
          </p>
          {width! >= 448 && (
            <p className="bg-blue-wavy px-2 rounded-3xl tablet:mt-2 text-center h-fit">
              Skill
            </p>
          )}
        </div>
      </div>

      {rosterAthletes &&
        rosterAthletes.map(({ athlete }: RosterData) => {
          return (
            <LineupAthleteItem
              key={athlete.id}
              width={width}
              athlete={athlete}
              athleteId={athlete.id}
            />
          );
        })}
    </div>
  );
};

export default LineupRosterSection;
