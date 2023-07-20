import { useState } from "react";
import LineupRosterSection from "./LineupRosterSection";
import LineupModalButton from "./LineupModalButton";
import LineupSeat from "./LineupSeat";
import { RosterData } from "../interfaces/EntityData";
import { transformLineupsToSeats } from "../utils/transformLineupsToSeats";
import { calculateBoatWeights } from "../utils/calculateBoatWeights";

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
  const frontWeight =
    boatWeight.drummerWeight +
    boatWeight.frontLeftWeight +
    boatWeight.frontRightWeight;
  const backWeight =
    boatWeight.steersWeight +
    boatWeight.backLeftWeight +
    boatWeight.backRightWeight;
  const leftWeight = boatWeight.frontLeftWeight + boatWeight.backLeftWeight;
  const rightWeight = boatWeight.frontRightWeight + boatWeight.backRightWeight;

  return (
    <div className="flex justify-center max-w-full desktop:max-w-[1280px] max-h-[84rem] mx-auto bg-white border rounded-md border-gray-border flex-2">
      <div className="flex flex-col max-w-[448px] tablet:w-[408px] my-4 overflow-auto">
        <h1 className="text-center mb-2">
          Total Weight
          {`: ${Object.values(boatWeight).reduce((a, b) => a + b, 0)} lbs`}
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
            {activeLineup && activeLineup.length ? (
              transformLineupsToSeats(activeLineup).map(
                (row: any, index: number) => {
                  return <LineupSeat key={index} seat={index} row={row} />;
                }
              )
            ) : (
              <p>Placeholder Boat Lineup</p>
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
