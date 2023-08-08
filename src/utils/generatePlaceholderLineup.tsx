import { nanoid } from "nanoid";
import { ActiveLineupData } from "../interfaces/EntityData";

export const generatePlaceholderLineup = (): ActiveLineupData[] => {
  const placeHolderArr = [];
  for (let i = 0; i < 22; i++) {
    placeHolderArr.push({
      athlete: { isEmpty: true, id: nanoid() },
          athleteId: nanoid(),
          id: nanoid(),
          position: i,
          updatedAt: new Date(),
    });
  }
  return placeHolderArr;
};
