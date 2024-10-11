const store = new Map<
  string,
  { encrypted: string; initializationVector: string }
>();

const get = async (
  key: string
): Promise<{ encrypted: string; initializationVector: string } | undefined> =>
  store.get(key);

// const getMultiple = async (
//   keys: string[]
// ): Promise<
//   {
//     key: string;
//     value: { encrypted: string; initializationVector: string } | undefined;
//   }[]
// > => keys.map((key) => ({ key, value: store.get(key) }));

const set = async (
  key: string,
  value: { encrypted: string; initializationVector: string }
) => store.set(key, value);

export default {
  get,
  set,
};
