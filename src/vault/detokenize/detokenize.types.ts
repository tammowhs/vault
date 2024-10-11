import { body } from "express-validator";

export type DetokenizeRequest = {
  id: string;
  data: { [key: string]: string };
};

export const DetokenizeRequestValidator = [
  body("id").isString().notEmpty(),
  body("data").isObject(),
  body("data.*").isString().notEmpty(),
];

export type DetokenizeResponse = {
  id: string;
  data: { [key: string]: { found: boolean; value: string } };
};
