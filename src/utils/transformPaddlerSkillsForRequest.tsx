interface PaddlerSkillsObjData {
  [key: string]: boolean;
}

const allPaddlerSkillsObj = {
  //  Roles
  isSteers: false,
  isDrummer: false,
  isStroker: false,
  isCaller: false,
  isBailer: false,
  //  Section
  isPacer: false,
  isEngine: false,
  isRocket: false,
  //  Race Distances
  is200m: false,
  is500m: false,
  is1000m: false,
  is2000m: false,
  //  Strengths
  isVeteran: false,
  isSteadyTempo: false,
  isVocal: false,
  isTechnicallyProficient: false,
  isLeader: false,
  //  Weaknesses
  isNewbie: false,
  isRushing: false,
  isLagging: false,
  isTechnicallyPoor: false,
  isInjuryProne: false,
  isLoadManaged: false,
};

export const transformPaddlerSkillsForRequest = (paddlerSkills: any) => {
  const paddlerStatObj: PaddlerSkillsObjData = {};

  for (let i = 0; i < paddlerSkills.length; i++) {
    paddlerStatObj[paddlerSkills[i]] = true;
  }

  return { ...allPaddlerSkillsObj, ...paddlerStatObj };
};
