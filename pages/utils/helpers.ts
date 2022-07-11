export const getMakesEndPt = (year: string) => `${makesEndPt}&year1=${year}&year2=${year}&format=json`;

export const getModelsEndPt = (year: string, make: string) =>
  `${modelsEndPt}&year1=${year}&year2=${year}&make=${make}&format=json`;
