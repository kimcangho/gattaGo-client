interface PaddlerSkillsObjData {
  // [key: string]: boolean;
  isSteers: boolean;
  isDrummer: boolean;
  isStroker: boolean;
  isCaller: boolean;
  isBailer: boolean;
  //  Section
  isPacer: boolean;
  isEngine: boolean;
  isRocket: boolean;
  //  Race Distances
  is200m: boolean;
  is500m: boolean;
  is1000m: boolean;
  is2000m: boolean;
  //  Strengths
  isVeteran: boolean;
  isSteadyTempo: boolean;
  isVocal: boolean;
  isTechnicallyProficient: boolean;
  isLeader: boolean;
  //  Weaknesses
  isNewbie: boolean;
  isRushing: boolean;
  isLagging: boolean;
  isTechnicallyPoor: boolean;
  isInjuryProne: boolean;
  isLoadManaged: boolean;
  athleteId: string;
  id: string;
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

export const transformPaddlerSkillsForRequest = (
  paddlerSkills: PaddlerSkillsObjData[][] | undefined[]
) => {
  const paddlerStatObj: PaddlerSkillsObjData | {} = {};

  console.log(paddlerStatObj)
  console.log(paddlerSkills)

  for (let i = 0; i < paddlerSkills.length; i++) {
    //@ts-ignore
    paddlerStatObj[paddlerSkills[i]] = true;
  }

  console.log(allPaddlerSkillsObj)
  console.log(paddlerStatObj)

  return { ...allPaddlerSkillsObj, ...paddlerStatObj };
};
