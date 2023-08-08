import { ActiveLineupData } from "../interfaces/EntityData";

export const trimActiveLineup = (activeLineup: ActiveLineupData[]) => {
  return activeLineup.filter((athlete) => {
    return !athlete.athlete.isEmpty;
  });
};
