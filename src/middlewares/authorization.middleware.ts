import { NextFunction, Request, Response } from "express";

export const authorize = (necessaryRight: "tokenize" | "detokenize") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const isAuthorized = res.locals.claims.includes(necessaryRight);

    if (!isAuthorized) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};
