export interface PaddlerSkills {
  id?: string;
  athleteId?: string;
  //  Roles
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
}