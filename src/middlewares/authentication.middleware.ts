import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerValue = req.headers.authorization;

  const lengthOfBearerPrefix = 7; // "Bearer "

  const token = headerValue?.substring(lengthOfBearerPrefix);

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const jwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    res.locals.claims = jwtPayload.claims;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).send("Unauthorized");
    }

    return res.status(500).send("Internal Server Error");
  }

  next();
};
