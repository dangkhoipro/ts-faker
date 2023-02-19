import { ECustomData } from "../../types";
import { GeneratorLib } from "../generatorLib";

let autoIncrementNumber = 1;

const generateStaticDataMapper: Record<ECustomData, () => string | number> = {
  [ECustomData.USER_NAME]: () => GeneratorLib.userName(),
  [ECustomData.FIRST_NAME]: () => GeneratorLib.firstName(),
  [ECustomData.LAST_NAME]: () => GeneratorLib.lastName(),
  [ECustomData.FULL_NAME]: () => GeneratorLib.fullName(),
  [ECustomData.PRICE]: () => GeneratorLib.price(),
  [ECustomData.EMAIL]: () => GeneratorLib.email(),
  [ECustomData.URL]: () => GeneratorLib.url(),
  [ECustomData.SENTENCE]: () => GeneratorLib.sentence(),
  [ECustomData.AUTO_INCREMENT_NUMBER]: () => autoIncrementNumber++,
  [ECustomData.UUID]: () => GeneratorLib.uuid(),
};

export function isStaticType(input: string): input is ECustomData {
  const keys = Object.keys(ECustomData);

  return keys.includes(input);
}

export function getStaticData(input: ECustomData) {
  return generateStaticDataMapper[input]();
}
