const generateRandomToken = (options?: {
  length?: number;
  useCapitalLetters?: boolean;
  useNumbers?: boolean;
  useSpecialCharacters?: boolean;
}) => {
  const defaultOptions = {
    length: 10,
    useCapitalLetters: false,
    useNumbers: false,
    useSpecialCharacters: false,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const characters = [
    "abcdefghijklmnopqrstuvwxyz",
    mergedOptions.useCapitalLetters ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
    mergedOptions.useNumbers ? "0123456789" : "",
    mergedOptions.useSpecialCharacters ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : "",
  ].join("");

  let token = "";
  for (let i = 0; i < mergedOptions.length; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  return token;
};

export default {
  generateRandomToken,
};
