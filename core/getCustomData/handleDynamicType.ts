import { GeneratorLib } from "..";
import { MyRegex } from "../../types";

const dynamicGetters = [getDynamicNumber, getDynamicSentence];

export function getDynamicData(input: string): any {
  // dynamic number
  const dynamicGetter = dynamicGetters.find((getter) => getter(input));

  if (dynamicGetter != null) return dynamicGetter(input);

  return "";
}

function getDynamicNumber(input: string) {
  const dynamicNumber = input.match(MyRegex.DynamicNumber);

  if (dynamicNumber?.groups) {
    const min = dynamicNumber.groups.min ? parseInt(dynamicNumber.groups.min) : undefined;
    const max = dynamicNumber.groups.max ? parseInt(dynamicNumber.groups.max) : undefined;
    return GeneratorLib.dynamicNumber({ min, max });
  }

  return undefined;
}

function getDynamicSentence(input: string) {
  const dynamicSentence = input.match(MyRegex.DynamicSentence);

  if (dynamicSentence?.groups) {
    const length = dynamicSentence.groups.length
      ? parseInt(dynamicSentence.groups.length)
      : undefined;
    return GeneratorLib.sentence(length);
  }

  return undefined;
}
