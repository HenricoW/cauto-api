import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "../../utils/configData";
import { getMakesEndPt } from "../../utils/helpers";
import { MakesData } from "../../utils/types";

export default function handler(req: NextApiRequest, res: NextApiResponse<MakesData>) {
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const year = req.body.year;

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
}
