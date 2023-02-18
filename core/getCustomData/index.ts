import { InterfaceMember, ECustomData, MyRegex } from "../../types";
import { GeneratorLib } from "../generatorLib";
import { getDynamicData } from "./handleDynamicType";
import { getStaticData, isStaticType } from "./handleStaticType";

export const getCustomData = (member: InterfaceMember) => {
  const matchResult = member.type.match(MyRegex.DataType);

  if (!matchResult) return GeneratorLib.string();

  const dataType = matchResult.groups!.dataType;

  if (isStaticType(dataType)) {
    return getStaticData(dataType);
  }

  return getDynamicData(dataType);
};
