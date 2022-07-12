import type { NextApiRequest, NextApiResponse } from "next";
import { baseURL, yearEndPt } from "../../utils/configData";
import { YearsData } from "../../utils/types";

export default function handler(req: NextApiRequest, res: NextApiResponse<YearsData>) {
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
}
