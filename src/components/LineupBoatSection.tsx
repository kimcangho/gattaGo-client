import { useState } from "react";
import LineupRosterSection from "./LineupRosterSection";
import LineupModalButton from "./LineupModalButton";
import LineupSeat from "./LineupSeat";
import { RosterData } from "../interfaces/EntityData";
import { transformLineupsToSeats } from "../utils/transformLineupsToSeats";
import { calculateBoatWeights } from "../utils/calculateBoatWeights";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { filterOutBoatAthletes } from "../utils/filterOutBoatAthletes";

interface DragonBoatSeatingProps {
  width: number | undefined;
  rosterAthletes: RosterData[];
  activeLineup: any[];
}

const LineupBoatSection = ({
  width,
  rosterAthletes,
  activeLineup,
}: DragonBoatSeatingProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const boatWeight = calculateBoatWeights(activeLineup);
  const { frontWeight, backWeight, leftWeight, rightWeight } = boatWeight;

  // drag event listeners
  const handleDragEnd = (event: DragEndEvent): void => {
    const { over } = event;
    console.log(over);
    console.log(event);
    console.log(activeLineup);
  };

  const handleDragStart = (event: DragStartEvent): void => {
    console.log(event);
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center max-w-full desktop:max-w-[1280px] max-h-[84rem] mx-auto bg-white border rounded-md border-gray-border flex-2">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToFirstScrollableAncestor]}
      >
        <div className="flex flex-col max-w-[448px] tablet:w-[408px] my-2 overflow-auto">
          <h1 className="text-center mb-2">
            Total Weight -{` `} {frontWeight + backWeight} lbs
          </h1>

          <h3 className="text-center">Front</h3>
          <h4 className="text-center">{frontWeight} lbs</h4>
          <div className="flex flex-row justify-center items-center max-w-[448px] space-x-2">
            <div className="w-12">
              <h3 className="text-center flex flex-col items-center">Left</h3>
              <h4 className="text-center">{leftWeight}</h4>
              <h4 className="text-center">lbs</h4>
            </div>

            <div className="mx-auto">
              {activeLineup &&
                activeLineup.length &&
                transformLineupsToSeats(activeLineup).map(
                  (row: any, index: number) => {
                    return <LineupSeat key={index} seat={index} row={row} />;
                  }
                )}
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-center">Right</h3>
              <h4 className="text-center">{rightWeight}</h4>
              <h4 className="text-center">lbs</h4>
            </div>
          </div>
          <h3 className="text-center">Back</h3>
          <h4 className="text-center">{backWeight} lbs</h4>
        </div>

        {(isModalOpen || width! >= 768) && (
          <LineupRosterSection
            rosterAthletes={filterOutBoatAthletes(rosterAthletes, activeLineup)}
            width={width}
          />
        )}
      </DndContext>

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
