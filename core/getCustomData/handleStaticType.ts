import { CustomData, TCustomData } from "../../types";
import { GeneratorLib } from "../generatorLib";

let autoIncrementNumber = 1;

const generateStaticDataMapper: Record<TCustomData, () => string | number> = {
  USER_NAME: () => GeneratorLib.userName(),
  FIRST_NAME: () => GeneratorLib.firstName(),
  LAST_NAME: () => GeneratorLib.lastName(),
  FULL_NAME: () => GeneratorLib.fullName(),
  PRICE: () => GeneratorLib.price(),
  EMAIL: () => GeneratorLib.email(),
  URL: () => GeneratorLib.url(),
  SENTENCE: () => GeneratorLib.sentence(),
  AUTO_INCREMENT_NUMBER: () => autoIncrementNumber++,
  UUID: () => GeneratorLib.uuid(),
};

export function isStaticType(input: string): input is keyof typeof CustomData {
  const keys = Object.keys(CustomData);

  return keys.includes(input);
}

export function getStaticData(input: TCustomData) {
  return generateStaticDataMapper[input]();
}
