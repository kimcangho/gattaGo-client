import LineupAthleteItem from "./LineupAthleteItem";
import { RosterData } from "../interfaces/EntityData";
import { Active, Over } from "@dnd-kit/core";
import { useParams, Link } from "react-router-dom";

interface LineupRosterSectionProps {
  rosterAthletes: RosterData[];
  width: number | undefined;
  activeId: Active | string | number;
  overId: Over | string | number;
}

const LineupRosterSection = ({
  rosterAthletes,
  width,
  activeId,
}: LineupRosterSectionProps) => {
  const { userId, teamId } = useParams();

  return (
    <>
      <div
        onClick={(event) => {
          event?.stopPropagation();
        }}
        className={`bg-white flex-1 inline-block border tablet:border-none border-gray-border shadow-md tablet:shadow-lg fixed top-[7rem] left-0 tablet:static w-[calc(100%-1.5rem)] tablet:w-full h-[calc(90%-4rem-0.5px)] overflow-auto max-h-[80rem] p-2 z-30 ${
          width! < 768 && activeId && "opacity-0"
        }`}
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

        {rosterAthletes.length === 0 ? (
          <div className="tablet:w-[448px] mx-auto">
            <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
              Oops! Looks like we're fresh out of paddlers...
            </h3>
            <h3 className="text-center my-4 mx-2.5 tablet:mx-5 tablet:mt-10 tablet:mb-5 tablet:text-2xl">
              Time to create a new paddler{" "}
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
        ) : (
          rosterAthletes &&
          rosterAthletes.map(({ athlete }: RosterData) => {
            return (
              <LineupAthleteItem
                key={athlete.id}
                width={width}
                athlete={athlete}
                athleteId={athlete.id}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default LineupRosterSection;
