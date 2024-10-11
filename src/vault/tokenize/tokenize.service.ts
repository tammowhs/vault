import encryptionService from "../../encryption/encryption.service";
import store from "../../store/store";
import tokenGenerator from "../token-generator";
import { TokenizeRequest, TokenizeResponse } from "./tokenize.types";

const tokenize = async (
  tokenizeRequest: TokenizeRequest
): Promise<TokenizeResponse> => {
  const dictionary = Object.entries(tokenizeRequest.data).map(
    ([property, value]) => {
      const token = tokenGenerator.generateRandomToken({
        length: 7,
        useNumbers: true,
      });

      const encryptionResult = encryptionService.encrypt(value);

      return { property, encryptionResult, token };
    }
  );

  const tokenized: TokenizeResponse = {
    id: tokenizeRequest.id,
    data: {},
  };

  for (const { property, encryptionResult, token } of dictionary) {
    await store.set(token, encryptionResult);
    tokenized.data[property] = token;
  }

  return tokenized;
};

export default {
  tokenize,
};
