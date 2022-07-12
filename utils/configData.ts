export const baseURL = process.env.baseURL;

export const yearEndPt = process.env.yearEndPt;
export const makesEndPt = process.env.makesEndPt;
export const modelsEndPt = process.env.modelsEndPt;
export const configsEndPt = process.env.configsEndPt;

export const identifier_mConfig = process.env.identifier_mConfig;
export const identifier_eConfig = process.env.identifier_eConfig;
export const identifier_emission = process.env.identifier_emission;
export const identifier_tStart = process.env.identifier_tStart;
export const identifier_tEnd = process.env.identifier_tEnd;
export const identifier_modelName = process.env.identifier_modelName;
export const identifier_carImg = process.env.identifier_carImg;

export const errModelConfig = {
  modelName: "",
  configData: [
    {
      modelConfig: "",
      engineConfig: "",
      fuel: "",
      img: "",
      co2pm: -1,
    },
  ],
};
