import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";

const algorithm = "aes-256-cbc";
const cipherKey = createHash("sha256")
  .update(process.env.ENCRYPTION_KEY!)
  .digest();

const encrypt = (
  text: string
): { encrypted: string; initializationVector: string } => {
  const initializationVector = randomBytes(16);

  const cypher = createCipheriv(algorithm, cipherKey, initializationVector);
  let encrypted = cypher.update(text, "utf8", "hex");
  encrypted += cypher.final("hex");

  return {
    encrypted,
    initializationVector: initializationVector.toString("hex"),
  };
};

const decrypt = (value: {
  encrypted: string;
  initializationVector: string;
}): string => {
  const decipher = createDecipheriv(
    algorithm,
    cipherKey,
    Buffer.from(value.initializationVector, "hex")
  );
  let decrypted = decipher.update(value.encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

export default { encrypt, decrypt };
