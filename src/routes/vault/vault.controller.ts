import { Request, Response } from "express";
import tokenizeService from "./tokenize/tokenize.service";
import detokenizeService from "./detokenize/detokenize.service";
import { TokenizeRequest, TokenizeResponse } from "./tokenize/tokenize.types";
import {
  DetokenizeRequest,
  DetokenizeResponse,
} from "./detokenize/detokenize.types";
import { validationResult } from "express-validator";

const tokenize = async (
  req: Request<{}, any, TokenizeRequest>,
  res: Response<TokenizeResponse | { error: any }>
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const tokenized = await tokenizeService.tokenize(req.body);

    res.status(201).json(tokenized);
  } catch (error) {
    res.status(500).json({ error: "unexpected error" });
  }
};

const detokenize = async (
  req: Request<{}, any, DetokenizeRequest>,
  res: Response<DetokenizeResponse | { error: any }>
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const detokenized = await detokenizeService.detokenize(req.body);

    res.status(200).json(detokenized);
  } catch (error) {
    res.status(500).json({ error: "unexpected error" });
  }
};

export default {
  tokenize,
  detokenize,
};
