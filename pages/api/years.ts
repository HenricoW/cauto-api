import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { baseURL, yearEndPt } from "../../utils/configData";
import { getCorsConfig, runMiddleware } from "../../utils/policy";
import { YearsData } from "../../utils/types";

const cors = Cors(getCorsConfig(["GET"]));

export default async function handler(req: NextApiRequest, res: NextApiResponse<YearsData>) {
  console.log("years req made", req.headers.origin);

  try {
    await runMiddleware(req, res, cors);

    let years: string[] = [];

    fetch(baseURL! + yearEndPt, {
      headers: { Accept: "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        years = data.menuItem.map((v: any) => v.value as string);
        res.status(200).json({ years });
        res.end();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ years: [""] });
        res.end();
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ years: [""] });
    res.end();
  }
}
