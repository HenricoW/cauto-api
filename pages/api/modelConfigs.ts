import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "../../utils/configData";
import { errModelConfig } from "../../utils/configData";
import { compileConfig, getConfigEndPt, getImgs, getInner, getModelName, getPgTable } from "../../utils/helpers";
import { getCorsConfig, runMiddleware } from "../../utils/policy";
import { MConfigsData } from "../../utils/types";
import Cors from "cors";

const cors = Cors(getCorsConfig(["GET", "POST"]));

export default async function handler(req: NextApiRequest, res: NextApiResponse<MConfigsData>) {
  const { year, make, model } = req.body;

  try {
    await runMiddleware(req, res, cors);

    fetch(baseURL + getConfigEndPt(year, make, model), { headers: { Accept: "text/html" } })
      .then((resp) => {
        console.log("year, make, model:", year, make, model);
        console.log(resp.statusText);
        return resp.text();
      })
      .then((page) => {
        console.log("");

        const pgTable = getPgTable(page);
        const modelName = getModelName(page);
        console.log("model name", modelName);

        const lineArray = pgTable.split("\n");
        const modelConfigs = getInner(lineArray, '<a href="Find.do?action=sbs');
        const engineConfigs = getInner(lineArray, '<span class="config">');
      const emits = getInner(lineArray, '<div class="ghg-score">').map((v) => +v.split(" ")[0]);
      console.log("model configs", modelConfigs);

      console.log("emits", emits);

        const imgs = getImgs(lineArray);
        console.log("imgs", imgs);

        if (modelConfigs.length !== emits.length) {
          console.log("Emission data mismatch");
          res.status(500).end();
        } else if (modelConfigs.length !== engineConfigs.length) {
          console.log("Engine data mismatch");
          res.status(500).end();
        } else if (modelConfigs.length !== imgs.length) {
          console.log("Image data mismatch");
          res.status(500).end();
        } else {
          const configData = compileConfig(modelConfigs, engineConfigs, imgs, emits);
          // console.log({ modelName, configData });

          res.status(200).json({ modelName, configData });
          res.end();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ ...errModelConfig, modelName: err.message });
        res.end();
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(errModelConfig);
    res.end();
  }
}
