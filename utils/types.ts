export type YearsData = {
  years: string[];
};

export type MakesData = {
  makes: string[];
};

export type ModelsData = {
  models: string[];
};

export type MConfigsData = {
  modelName: string;
  configData: {
    modelConfig: string;
    engineConfig: string;
    fuel: string;
    img: string;
    co2pm: number;
  }[];
};
