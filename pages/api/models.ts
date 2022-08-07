import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "../../utils/configData";
import { getModelsEndPt } from "../../utils/helpers";
import { getCorsConfig, runMiddleware } from "../../utils/policy";
import { ModelsData } from "../../utils/types";
import Cors from "cors";

const cors = Cors(getCorsConfig(["GET", "POST"]));

export default async function handler(req: NextApiRequest, res: NextApiResponse<ModelsData>) {
  const year = req.body.year;
  const make = req.body.make;

  try {
    await runMiddleware(req, res, cors);

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
  } catch (error) {
    console.log(error);
    res.status(400).json({ models: [""] });
    res.end();
  }
}
