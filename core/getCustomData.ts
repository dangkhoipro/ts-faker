import { InterfaceMember, MemberOtherData, MyRegex } from "../types";
import { GeneratorLib } from "./generatorLib";

const generateStaticDataMapper: Record<MemberOtherData, () => string> = {
  [MemberOtherData.USER_NAME]: () => GeneratorLib.userName(),
  [MemberOtherData.FIRST_NAME]: () => GeneratorLib.userName(),
  [MemberOtherData.LAST_NAME]: () => GeneratorLib.userName(),
  [MemberOtherData.USER_NAME]: () => GeneratorLib.userName(),
  [MemberOtherData.FULL_NAME]: () => GeneratorLib.userName(),
  [MemberOtherData.PRICE]: () => GeneratorLib.userName(),
  [MemberOtherData.DESCRIPTION]: () => GeneratorLib.userName(),
};

function isStaticType(input: string): input is MemberOtherData {
  const keys = Object.keys(MemberOtherData);

  return keys.includes(input);
}

export const getCustomData = (member: InterfaceMember) => {
  const matchResult = member.type.match(MyRegex.DataType);

  if (!matchResult) return GeneratorLib.string();

  const dataType = matchResult.groups!.dataType;

  if (isStaticType(dataType)) {
    return generateStaticDataMapper[dataType]();
  }

  return getDynamicType(dataType);
};

function getDynamicType(input: string): string | number {
  // dynamic number
  const dynamicNumber = input.match(MyRegex.DynamicNumber);

  if (dynamicNumber?.groups) {
    const min = dynamicNumber.groups.min ? parseInt(dynamicNumber.groups.min) : undefined;
    const max = dynamicNumber.groups.max ? parseInt(dynamicNumber.groups.max) : undefined;
    return GeneratorLib.dynamicNumber({ min, max });
  }

  return "";
}
