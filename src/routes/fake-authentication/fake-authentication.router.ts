import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = Router();

router.post(
  "/",
  [
    body("claims").isArray({ min: 1 }),
    body("claims.*").isIn(["tokenize", "detokenize"]),
  ],
  async (
    req: Request<any, any, { claims: ("tokenize" | "detokenize")[] }>,
    res: Response
  ) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const signedJwt = jwt.sign(
        { claims: req.body.claims },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).send({ token: signedJwt });
    } catch (error) {
      res.status(500).json({ error: "unexpected error" });
    }
  }
);

export default router;
