import { nanoid } from "nanoid";

export const injectIntoLineup = (incompleteLineupArr: any[]) => {
  const trackerArr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21,
  ];

  const rebuiltLineupArr = incompleteLineupArr;

  rebuiltLineupArr.forEach((athlete) => {
    const index = trackerArr.indexOf(athlete.position);
    trackerArr.splice(index, 1);
  });

  trackerArr.forEach((position) => {
    rebuiltLineupArr.splice(position, 0, {
      athlete: { isEmpty: true, id: nanoid() },
      athleteId: nanoid(),
      id: nanoid(),
      position,
      updatedAt: null,
    });
  });

  return rebuiltLineupArr;
};
