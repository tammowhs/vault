import { body } from "express-validator";

export type TokenizeRequest = {
  id: string;
  data: { [key: string]: string };
};

export const TokenizeRequestValidator = [
  body("id").isString().notEmpty(),
  body("data").isObject(),
  body("data.*").isString().notEmpty(),
];

export type TokenizeResponse = TokenizeRequest;
