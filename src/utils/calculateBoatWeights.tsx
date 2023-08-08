import { ActiveLineupData } from "../interfaces/EntityData";

interface CalculatedWeightData {
  frontWeight: number;
  backWeight: number;
  leftWeight: number;
  rightWeight: number;
}

export const calculateBoatWeights = (lineupArr: ActiveLineupData[]) => {
  let boatWeights = {
    drummerWeight: 0,
    frontLeftWeight: 0,
    frontRightWeight: 0,
    backLeftWeight: 0,
    backRightWeight: 0,
    steersWeight: 0,
  };

  lineupArr.forEach((paddler: any) => {
    if (paddler?.athlete?.weight) {
      //    Drummer
      if (paddler.position === 0) {
        boatWeights = {
          ...boatWeights,
          drummerWeight: paddler.athlete.weight,
        };
      }
      //    Steers
      if (paddler.position === 21) {
        boatWeights = {
          ...boatWeights,
          steersWeight: paddler.athlete.weight,
        };
      }
      //  Front Left
      if (
        paddler.position > 0 &&
        paddler.position <= 10 &&
        paddler.position % 2 === 1
      ) {
        boatWeights = {
          ...boatWeights,
          frontLeftWeight: boatWeights.frontLeftWeight + paddler.athlete.weight,
        };
      }
      //  Front Right
      if (
        paddler.position > 0 &&
        paddler.position <= 10 &&
        paddler.position % 2 === 0
      ) {
        boatWeights = {
          ...boatWeights,
          frontRightWeight:
            boatWeights.frontRightWeight + paddler.athlete.weight,
        };
      }
      //  Back Left
      if (
        paddler.position > 10 &&
        paddler.position <= 20 &&
        paddler.position % 2 === 1
      ) {
        boatWeights = {
          ...boatWeights,
          backLeftWeight: boatWeights.backLeftWeight + paddler.athlete.weight,
        };
      }
      //  Back Right
      if (
        paddler.position > 10 &&
        paddler.position <= 20 &&
        paddler.position % 2 === 0
      ) {
        boatWeights = {
          ...boatWeights,
          backRightWeight: boatWeights.backRightWeight + paddler.athlete.weight,
        };
      }
    }
  });

  const {
    drummerWeight,
    frontLeftWeight,
    frontRightWeight,
    backLeftWeight,
    backRightWeight,
    steersWeight,
  } = boatWeights;

  const calculatedBoatWeights: CalculatedWeightData = {
    frontWeight: drummerWeight + frontLeftWeight + frontRightWeight,
    backWeight: steersWeight + backLeftWeight + backRightWeight,
    leftWeight: frontLeftWeight + backLeftWeight,
    rightWeight: frontRightWeight + backRightWeight,
  };

  return calculatedBoatWeights;
};
