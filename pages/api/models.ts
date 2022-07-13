import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "../../utils/configData";
import { getModelsEndPt } from "../../utils/helpers";
import { ModelsData } from "../../utils/types";

export default function handler(req: NextApiRequest, res: NextApiResponse<ModelsData>) {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const year = req.body.year;
  const make = req.body.make;

  fetch(baseURL + getModelsEndPt(year, make))
    .then((resp) => resp.json())
    .then((data) => {
      const models = data.options.map((v: any) => v.value as string);
      res.status(200).json({ models });
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ models: [""] });
      res.end();
    });
}
