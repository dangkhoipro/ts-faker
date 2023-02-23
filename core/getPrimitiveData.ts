import { PrimitiveType } from "../types";
import { GeneratorLib } from "./generatorLib";

const primitiveTypeToData: Record<PrimitiveType, () => any> = {
  [PrimitiveType.BOOLEAN]: () => GeneratorLib.boolean(),
  [PrimitiveType.STRING]: () => GeneratorLib.string(),
  [PrimitiveType.NUMBER]: () => GeneratorLib.number(),
  [PrimitiveType.DATE]: () => GeneratorLib.datetime(),
  [PrimitiveType.ARRAY_STRING]: () => [...Array(3)].map((index) => GeneratorLib.string()),
  [PrimitiveType.ARRAY_NUMBER]: () => [...Array(3)].map((index) => GeneratorLib.number()),
};

export function isPrimitiveType(input: string): input is PrimitiveType {
  return Object.keys(primitiveTypeToData).includes(input);
}

export function getPrimitiveData(input: PrimitiveType) {
  return primitiveTypeToData[input]();
}
