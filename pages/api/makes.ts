import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "../../utils/configData";
import { getMakesEndPt } from "../../utils/helpers";
import { getCorsConfig, runMiddleware } from "../../utils/policy";
import { MakesData } from "../../utils/types";
import Cors from "cors";

const cors = Cors(getCorsConfig(["GET", "POST"]));

export default async function handler(req: NextApiRequest, res: NextApiResponse<MakesData>) {
  const year = req.body.year;

  try {
    await runMiddleware(req, res, cors);

    fetch(baseURL + getMakesEndPt(year))
      .then((resp) => resp.json())
      .then((data) => {
        const makes = data.options.map((v: any) => v.value as string);
        res.status(200).json({ makes });
        res.end();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ makes: [""] });
        res.end();
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ makes: [""] });
    res.end();
  }
}
