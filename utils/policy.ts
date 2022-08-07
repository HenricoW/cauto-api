import { NextApiRequest, NextApiResponse } from "next";

const allowedOrigins = ["https://127.0.0.1:3000", "https://localhost:3000", "https://cautoh.vercel.app"];

export const getCorsConfig = (methods: string[]) => ({
  methods,
  origin: (origin: string | undefined, cb: Function) => {
    if (allowedOrigins.includes(origin || "")) cb(null, true);
    else cb({ message: "Not allowed" });
  },
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
});

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      console.log("middleware result:", result);
      if (!result) return resolve("Allowed");
      if (result.message) return reject(result.message);
      return resolve(result);
    });
  });
};
