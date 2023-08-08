import { ActiveLineupData, RosterData } from "../interfaces/EntityData";

export const filterOutBoatAthletes = (
  rosterAthletes: RosterData[],
  activeLineup: ActiveLineupData[]
) => {
  const athleteIdArr: string[] = activeLineup.map((seat) => seat.athleteId);
  const filteredAthleteArr: RosterData[] = rosterAthletes.filter((athlete) => {
    if (!athleteIdArr.includes(athlete.athleteId)) return athlete;
  });

  return [...filteredAthleteArr];
};
