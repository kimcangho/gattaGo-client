export const filterOutBoatAthletes = (
  rosterAthletes: any[],
  activeLineup: any[]
) => {
  const athleteIdArr: any[] = activeLineup.map((seat) => seat.athleteId);

  const filteredAthleteArr = rosterAthletes.filter((athlete) => {
    if (!athleteIdArr.includes(athlete.athleteId)) return athlete;
  });

  return filteredAthleteArr;
};
