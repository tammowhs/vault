import { parse } from "csv-parse";
import fs from "fs";

const filePath = "./store.csv";

type KeyValuePair = {
  key: string;
  value: { encrypted: string; initializationVector: string };
};

const readFromCSVFile = async () => {
  const keyValuePairs: KeyValuePair[] = [];

  return new Promise<KeyValuePair[]>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: "," }))
      .on("data", (chunk: [string, string, string]) => {
        keyValuePairs.push({
          key: chunk[0],
          value: { encrypted: chunk[1], initializationVector: chunk[2] },
        });
      })
      .on("end", () => {
        resolve(keyValuePairs);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const writeToCSVFile = async (keyValuePairs: KeyValuePair[]) => {
  return new Promise<void>((resolve, reject) => {
    const csvData = keyValuePairs.map(
      (pair) =>
        `${pair.key},${pair.value.encrypted},${pair.value.initializationVector}\n`
    );

    const ws = fs
      .createWriteStream(filePath)
      .on("error", (err) => reject(err))
      .on("finish", () => resolve());

    csvData.forEach((data) => {
      ws.write(data);
    });

    ws.end();
  });
};

const get = async (
  key: string
): Promise<{ encrypted: string; initializationVector: string } | undefined> => {
  const keyValuePairs = await readFromCSVFile();

  return keyValuePairs.find((pair) => pair.key === key)?.value;
};

const getMultiple = async (
  keys: string[]
): Promise<
  {
    key: string;
    value: { encrypted: string; initializationVector: string } | undefined;
  }[]
> => {
  const keyValuePairs = await readFromCSVFile();

  return keys.map((key) => ({
    key,
    value: keyValuePairs.find((pair) => pair.key === key)?.value,
  }));
};

const set = async (
  key: string,
  value: { encrypted: string; initializationVector: string }
) => {
  const keyValuePairs = await readFromCSVFile();

  writeToCSVFile([...keyValuePairs, { key, value }]);
};

export default {
  get,
  set,
};
