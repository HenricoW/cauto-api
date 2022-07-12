import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL, identifier_eConfig, identifier_emission, identifier_mConfig } from "../../utils/configData";
import { errModelConfig } from "../../utils/configData";
import { compileConfig, getConfigEndPt, getImgs, getInner, getModelName, getPgTable } from "../../utils/helpers";
import { MConfigsData } from "../../utils/types";

export default function handler(req: NextApiRequest, res: NextApiResponse<MConfigsData>) {
  const { year, make, model } = req.body;

  fetch(baseURL + getConfigEndPt(year, make, model), { headers: { Accept: "text/html" } })
    .then((resp) => resp.text())
    .then((page) => {
      const pgTable = getPgTable(page);
      const modelName = getModelName(page);

      const lineArray = pgTable.split("\n");
      const modelConfigs = getInner(lineArray, identifier_mConfig!);
      const engineConfigs = getInner(lineArray, identifier_eConfig!);
      const emits = getInner(lineArray, identifier_emission!).map((v) => +v.split(" ")[0]);

      const imgs = getImgs(lineArray);

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
      res.status(500).json(errModelConfig);
      res.end();
    });
}
