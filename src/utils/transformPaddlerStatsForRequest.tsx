interface PaddlerStatObjData {
  [key: string]: boolean;
}

export const transformPaddlerStatsForRequest = (paddlerStats: any) => {
  const paddlerStatObj: PaddlerStatObjData = {};

  for (let i = 0; i < paddlerStats.length; i++) {
    paddlerStatObj[paddlerStats[i]] = true;
  }

  return paddlerStatObj;
};
