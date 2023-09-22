import { calculateBoatWeights } from "../utils/calculateBoatWeights";
import { transformLineupsToSeats } from "../utils/transformLineupsToSeats";
import RacePlanBoatSeat from "./RacePlanBoatSeat";

interface RacePlanBoatLineupProps {
  currentLineup: any[];
}

const RacePlanBoatLineup = ({ currentLineup }: RacePlanBoatLineupProps) => {
  const boatWeight = calculateBoatWeights(currentLineup);
  const { frontWeight, backWeight, leftWeight, rightWeight } = boatWeight;

  return (
    <div className="mx-auto">
      <div className="flex flex-col max-w-[448px] midMobile:max-w-full tablet:w-[408px] my-2 overflow-auto">
        <h1 className="text-center mb-2">
          Total Weight -{` `} {frontWeight + backWeight} lbs
        </h1>

        <h3 className="text-center">Front</h3>
        <h4 className="text-center">
          {frontWeight}
          lbs
        </h4>
        <div className="flex flex-row justify-center items-center max-w-[448px] space-x-2">
          <div className="w-12">
            <h3 className="text-center flex flex-col items-center">Left</h3>
            <h4 className="text-center">{leftWeight}</h4>
            <h4 className="text-center">lbs</h4>
          </div>

          <div className="mx-auto">
            {currentLineup &&
              currentLineup.length &&
              transformLineupsToSeats(currentLineup).map(
                (row: any, index: number) => {
                  return (
                    <RacePlanBoatSeat key={index} seat={index} row={row} />
                  );
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
        <h4 className="text-center">
          {backWeight}
          lbs
        </h4>
      </div>
    </div>
  );
};

export default RacePlanBoatLineup;
