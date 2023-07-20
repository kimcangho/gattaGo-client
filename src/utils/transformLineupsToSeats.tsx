export const transformLineupsToSeats = (lineupArr: any[]) => {
  const lineupWithSeatsArr: any[] = [];

  lineupArr.forEach((paddler) => {
    if (paddler.position === 0 || paddler.position === 21)
      lineupWithSeatsArr.push([paddler]);
    else {
      const rowInBoat = Math.ceil(paddler.position / 2);
      if (!lineupWithSeatsArr[rowInBoat]) lineupWithSeatsArr[rowInBoat] = [];
      lineupWithSeatsArr[rowInBoat].push(paddler);
    }
  });

  return lineupWithSeatsArr;
};