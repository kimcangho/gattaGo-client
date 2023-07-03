export const convertPaddlerStatToField = (paddlerStat: string, truncateNumber: number) => {
  return paddlerStat
    .slice(truncateNumber)
    .split("")
    .map((char, index) => {
      if (char.toUpperCase() === char && char !== "0" && index !== 0) {
        return ` ${char}`;
      }
      return char;
    })
    .join("");
};
