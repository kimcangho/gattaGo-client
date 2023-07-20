export const generatePlaceholderLineup = () => {
  const placeHolderArr = [];
  for (let i = 0; i < 22; i++) {
    placeHolderArr.push({
      athlete: { isEmpty: true },
      athleteId: null,
      id: null,
      position: i,
      updatedAt: null,
    });
  }
  return placeHolderArr;
};
