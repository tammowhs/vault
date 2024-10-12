import { Router } from "express";
import vaultController from "./vault.controller";
import { TokenizeRequestValidator } from "./tokenize/tokenize.types";
import { DetokenizeRequestValidator } from "./detokenize/detokenize.types";
import { authorize } from "../../middlewares/authorization.middleware";

const router = Router();

router.post(
  "/tokenize",
  authorize("tokenize"),
  TokenizeRequestValidator,
  vaultController.tokenize
);

router.post(
  "/detokenize",
  authorize("detokenize"),
  DetokenizeRequestValidator,
  vaultController.detokenize
);

export default router;
