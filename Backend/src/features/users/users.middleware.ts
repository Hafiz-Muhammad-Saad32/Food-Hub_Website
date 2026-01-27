import { Request, Response, NextFunction } from "express";

function logger(req: Request, res: Response, next: NextFunction) {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  console.log(`
    Request Method: ${req.method}
    Request URL: ${req.url}
    Date: ${currentDate}
    Time: ${currentTime}
  `);

  next();
}

export default logger;
