import { baseURL, configsEndPt, identifier_carImg, makesEndPt, modelsEndPt } from "./configData";
import { identifier_modelName, identifier_tEnd, identifier_tStart } from "./configData";

export const getMakesEndPt = (year: string) => `${makesEndPt}&year1=${year}&year2=${year}&format=json`;

export const getModelsEndPt = (year: string, make: string) =>
  `${modelsEndPt}&year1=${year}&year2=${year}&make=${make}&format=json`;

export const getConfigEndPt = (year: string, make: string, model: string) =>
  `${configsEndPt}&year1=${year}&year2=${year}&make=${make}&baseModel=${model}&srchtyp=ymm`;

export const trimLine = (line: string) => line.slice(line.indexOf(`>`) + 1, line.indexOf(`</`));

export const getInner = (lineArr: string[], tag: string) =>
  lineArr.filter((val) => val.includes(tag)).map((l) => trimLine(l));

export const getPgTable = (pg: string) => {
  const start = pg.indexOf(identifier_tStart);
  const end = pg.indexOf(identifier_tEnd);
  return pg.slice(start, end);
};

export const getModelName = (pg: string) => {
  const allLines = pg.split("\n");
  const searchLine = allLines.filter((v) => v.includes(identifier_modelName));
  return trimLine(allLines[allLines.indexOf(searchLine[0]) + 1]);
};

export const getImgs = (lineArray: string[]) => {
  const imgLines = lineArray.reduce((acc: number[], v, i) => (v.includes(identifier_carImg) ? [...acc, i] : acc), []);
  return imgLines.map((i) => lineArray[i].split("src=")[1].split(`"`)[1]).map((v) => baseURL + v);
};

export const compileConfig = (modelConfigs: string[], engineConfigs: string[], imgs: string[], emits: number[]) => {
  const configData = [];
  for (let i = 0; i < modelConfigs.length; i++) {
    const engineConfig = engineConfigs[i].slice(0, engineConfigs[i].lastIndexOf(","));
    const fuel = engineConfigs[i].slice(engineConfigs[i].lastIndexOf(",") + 2);

    configData.push({
      modelConfig: modelConfigs[i],
      engineConfig,
      fuel,
      img: imgs[i],
      co2pm: emits[i],
    });
  }

  return configData;
};
