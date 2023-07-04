interface PaddlerSkillsObjData {
  [key: string]: boolean;
}

export const transformPaddlerSkillsForRequest = (paddlerSkills: any) => {
  const paddlerStatObj: PaddlerSkillsObjData = {};

  for (let i = 0; i < paddlerSkills.length; i++) {
    paddlerStatObj[paddlerSkills[i]] = true;
  }

  return paddlerStatObj;
};
