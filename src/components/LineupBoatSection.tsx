import LineupRosterSection from "./LineupRosterSection";
import LineupModalButton from "./LineupModalButton";
import LineupSeat from "./LineupSeat";
import { RosterData } from "../interfaces/EntityData";
import { dragonBoatArr } from "../data/dragonBoatArr";

interface DragonBoatSeatingProps {
  width: number | undefined;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  handleToggleModal: Function;
  rosterAthletes: RosterData[];
}

const LineupBoatSection = ({
  width,
  isModalOpen,
  setIsModalOpen,
  handleToggleModal,
  rosterAthletes,
}: DragonBoatSeatingProps) => {
  return (
    <div className="flex justify-center desktop:max-w-[1280px] max-h-[80rem] mx-auto bg-white border rounded-md border-gray-border flex-2">
      <div className="flex flex-col max-w-[408px] tablet:w-[408px] my-4 overflow-auto">
        <h3 className="text-center">Front</h3>
        <div className="flex flex-row items-center max-w-[448px]">
          <h3 className="text-center -rotate-90 mr-2">Left</h3>

          <div className="mx-auto">
            {dragonBoatArr.map((_row: number, index: number) => {
              return <LineupSeat key={index} seat={index} />;
            })}
          </div>

          <h3 className="rotate-90">Right</h3>
        </div>
        <h3 className="text-center">Back</h3>
      </div>

      {(isModalOpen || width! >= 768) && (
        <LineupRosterSection rosterAthletes={rosterAthletes} width={width} />
      )}
      <LineupModalButton
        width={width}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleToggleModal={handleToggleModal}
      />
    </div>
  );
};

export default LineupBoatSection;
