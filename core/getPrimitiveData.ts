import { MemberType } from "../types";
import { GeneratorLib } from "./generatorLib";

const primitiveTypeToData: Record<MemberType, () => any> = {
  [MemberType.BOOLEAN]: () => GeneratorLib.boolean(),
  [MemberType.STRING]: () => GeneratorLib.string(),
  [MemberType.NUMBER]: () => GeneratorLib.number(),
  [MemberType.DATE]: () => GeneratorLib.datetime(),
  [MemberType.ARRAY_STRING]: () => [...Array(3)].map((index) => GeneratorLib.string()),
  [MemberType.ARRAY_NUMBER]: () => [...Array(3)].map((index) => GeneratorLib.number()),
};

export function isPrimitiveType(input: string): input is MemberType {
  return Object.keys(primitiveTypeToData).includes(input);
}

export function getPrimitiveData(input: MemberType) {
  return primitiveTypeToData[input]();
}
