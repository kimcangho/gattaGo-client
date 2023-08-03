export const trimActiveLineup = (activeLineup: any[]) => {
  return activeLineup.filter((athlete) => {
    return !athlete.athlete.isEmpty;
  });
};
