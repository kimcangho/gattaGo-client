export const convertPaddlerSkillToField = (paddlerSkill: string, truncateNumber: number) => {
  return paddlerSkill
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
