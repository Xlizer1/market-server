import { Express, Request, Response } from "express";

function router(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.json({ ststus: 200, msg: "no page" });
  });
}

export default router;
