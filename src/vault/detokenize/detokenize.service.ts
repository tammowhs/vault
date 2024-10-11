import encryptionService from "../../encryption/encryption.service";
import store from "../../store/store";
import { DetokenizeRequest, DetokenizeResponse } from "./detokenize.types";

const detokenize = async (
  detokenizeRequest: DetokenizeRequest
): Promise<DetokenizeResponse> => {
  const detokenized: DetokenizeResponse = {
    id: detokenizeRequest.id,
    data: {},
  };

  await Promise.all(
    Object.entries(detokenizeRequest.data).map(async ([property, token]) => {
      const value = await store.get(token);

      const decrypted = value ? encryptionService.decrypt(value) : undefined;

      detokenized.data[property] = {
        found: !!decrypted,
        value: decrypted || "",
      };
    })
  );

  return detokenized;
};

export default {
  detokenize,
};
