import { nanoid } from "nanoid";
// import { v4 as uuidv4 } from 'uuid';

export const generatePlaceholderLineup = () => {
  const placeHolderArr = [];
  for (let i = 0; i < 22; i++) {
    placeHolderArr.push({
      athlete: { isEmpty: true, id: nanoid() },
          athleteId: nanoid(),
          id: nanoid(),
          position: i,
          updatedAt: null,
    });
  }
  return placeHolderArr;
};
