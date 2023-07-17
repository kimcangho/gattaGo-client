import LineupAthleteItem from "./LineupAthleteItem";
import { RosterData } from "../interfaces/EntityData";

interface LineupPanelProps {
  rosterAthletes: RosterData[];
}

const LineupPanel = ({ rosterAthletes }: LineupPanelProps) => {
  return (
    <>
      {/* {width! < 448 && ( */}
      <div className="bg-white inline-block border border-black fixed top-[13rem] left-0 w-[calc(100%-32px)] h-[calc(90%-12rem-0.5px)] overflow-auto p-2">
        <div className="flex justify-between items-center">
          <div className="text-black mb-2">
            <h1>Roster</h1>
            <p className="text-black">
              Total: {rosterAthletes.length} paddler
              {rosterAthletes.length !== 1 && `s`}
            </p>
          </div>
          <div className="flex flex-col w-auto text-black font-bold space-y-2 my-4">
            <p className=" bg-gray-border rounded-3xl w-24 tablet:mt-2 text-center">
              PaddleSide
            </p>
            <p className="bg-green-light px-2 rounded-3xl tablet:mt-2 text-center">
              Eligibility
            </p>
          </div>
        </div>
        {/* map lineup athletes from roster list */}
        {rosterAthletes &&
          rosterAthletes.map(({ athlete }: RosterData) => {
            return (
              <LineupAthleteItem
                key={athlete.id}
                athlete={athlete}
                athleteId={athlete.id}
              />
            );
          })}
      </div>
      {/* )} */}
    </>
  );
};

export default LineupPanel;
