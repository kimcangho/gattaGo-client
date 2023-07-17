import LineupPanel from "./LineupPanel";
import LineupModalButton from "./LineupModalButton";
import Seat from "./Seat";
import { RosterData } from "../interfaces/EntityData";
import { dragonBoatArr } from "../data/dragonBoatArr";

interface DragonBoatSeatingProps {
  width: number | undefined;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  isLineupActive: boolean;
  handleToggleModal: Function;
  rosterAthletes: RosterData[];
}

const DragonBoatSeating = ({
  width,
  isModalOpen,
  setIsModalOpen,
  isLineupActive,
  handleToggleModal,
  rosterAthletes,
}: DragonBoatSeatingProps) => {
  return (
    <div className="desktop:max-w-[1280px] mx-auto bg-white border rounded-md border-gray-border">
      {/* Dragonboat Section */}
      <div className="flex flex-col max-w-[448px] my-4">
        <h1 className="text-center mb-4">Boat Order</h1>
        <h3 className="text-center">Front</h3>
        <div className="flex flex-row items-center max-w-[448px]">
          <h3 className="text-center -rotate-90 mr-2">Left</h3>

          <div className="mx-auto">
            {dragonBoatArr.map((_row: number, index: number) => {
              return <Seat key={index} seat={index} />;
            })}
          </div>

          <h3 className="rotate-90">Right</h3>
        </div>
        <h3 className="text-center">Back</h3>
      </div>
      {/* To-do: Roster Section */}
      {(isModalOpen || width! >= 448) && (
        <LineupPanel rosterAthletes={rosterAthletes} />
      )}
      <LineupModalButton
        width={width}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isLineupActive={isLineupActive}
        handleToggleModal={handleToggleModal}
      />
    </div>
  );
};

export default DragonBoatSeating;
