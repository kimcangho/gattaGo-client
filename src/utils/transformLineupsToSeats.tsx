import { nanoid } from "nanoid";
import { ActiveLineupData } from "../interfaces/EntityData";

export const transformLineupsToSeats = (lineupArr: ActiveLineupData[]) => {
  const lineupWithSeatsArr: ActiveLineupData[][] = [];
  const trackerArr: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21,
  ];

  lineupArr.forEach((paddler) => {
    if (paddler.position === 0 || paddler.position === 21) {
      lineupWithSeatsArr.push([paddler]);
    } else {
      const rowInBoat = Math.ceil(paddler.position / 2);
      if (!lineupWithSeatsArr[rowInBoat]) lineupWithSeatsArr[rowInBoat] = [];
      lineupWithSeatsArr[rowInBoat].push(paddler);
    }

    const index = trackerArr.indexOf(paddler.position);
    trackerArr.splice(index, 1);
  });

  trackerArr.forEach((position) => {
    const insertRow = Math.ceil(position / 2);

    if (position === 0 || position === 21) {
      lineupWithSeatsArr[insertRow] = [
        {
          athlete: { isEmpty: true, id: nanoid() },
          athleteId: nanoid(),
          id: nanoid(),
          position,
          updatedAt: new Date(),
        },
      ];
    } else {
      if (!lineupWithSeatsArr[insertRow]) lineupWithSeatsArr[insertRow] = [];

      if (position % 2 === 1) {
        lineupWithSeatsArr[insertRow].unshift({
          athlete: { isEmpty: true, id: nanoid() },
          athleteId: nanoid(),
          id: nanoid(),
          position,
          updatedAt: new Date(),
        });
      } else {
        lineupWithSeatsArr[insertRow].push({
          athlete: { isEmpty: true, id: nanoid() },
          athleteId: nanoid(),
          id: nanoid(),
          position,
          updatedAt: new Date(),
        });
      }
    }
  });

  console.log(lineupWithSeatsArr);
  return lineupWithSeatsArr;
};
