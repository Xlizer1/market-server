import { Express, Request, Response, Router } from "express";

const router = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.json({ ststus: 200, msg: "no page" });
  });
};

export default router;
