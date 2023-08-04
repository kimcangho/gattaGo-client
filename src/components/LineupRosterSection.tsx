import LineupAthleteItem from "./LineupAthleteItem";
import { RosterData } from "../interfaces/EntityData";
import { DragOverlay } from "@dnd-kit/core";

interface LineupRosterSectionProps {
  rosterAthletes: RosterData[];
  width: number | undefined;
  activeId: any;
}

const LineupRosterSection = ({
  rosterAthletes,
  width,
  activeId,
}: LineupRosterSectionProps) => {
  return (
    <>
      <div
        onClick={(event) => {
          event?.stopPropagation();
        }}
        className="bg-white flex-1 inline-block border tablet:border-none border-gray-border shadow-md tablet:shadow-lg fixed top-[7rem] left-0 tablet:static w-[calc(100%-1.5rem)] tablet:w-full h-[calc(90%-4rem-0.5px)] overflow-auto max-h-[80rem] p-2 z-0"
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
      <DragOverlay>
        {
          //  Consider creating a new component to pass in athlete prop based on activeId
          //  e.g. <DraggableRosterAthlete athlete={sendAthleteThrough(activeId)} />
          activeId ? (
            <div
              className={`flex relative justify-center items-center bg-blue-wavy
      rounded-xl w-16 midMobile:w-20 h-16 midMobile:h-20 border text-black cursor-grab z-10`}
            >
              <div className="bg-gray-border w-4 h-4 absolute top-1 left-1 flex items-center justify-center rounded-full">
                <p>L</p>
              </div>
              <div className="bg-green-light w-4 h-4 absolute top-1 right-1 flex items-center justify-center rounded-full">
                <p>O</p>
              </div>
              <h5 className="text-center text-[1.5rem] midMobile:text-[2.5rem]">
                KH
              </h5>
              <div className="bg-orange-light w-fit h-fit px-2 absolute bottom-0.5 flex items-center justify-center rounded-full text-xs">
                <p>213</p>
              </div>
            </div>
          ) : null
        }
      </DragOverlay>
    </>
  );
};

export default LineupRosterSection;
