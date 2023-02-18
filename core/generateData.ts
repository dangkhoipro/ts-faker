import { OPTIONS } from "../config";
import { transform } from "../core";
import { DataItem, GeneratedType } from "../types";
import { getCustomData } from "./getCustomData";
import { getPrimitiveData, isPrimitiveType } from "./getPrimitiveData";

export const generateMockData = async (
  source: string,
  options = OPTIONS
): Promise<GeneratedType[]> => {
  const interfaces = await transform(source);
  const generatedTypes: GeneratedType[] = [];
  for (const _interface of interfaces) {
    const generatedType: GeneratedType = { name: "", data: [] };
    generatedType.name = _interface.itemName;
    const itemMembers = _interface.members;
    Array.from({ length: +options.scale }).forEach((_) => {
      const row: DataItem = {};
      for (const member of itemMembers) {
        const memberType = member.type;

        if (isPrimitiveType(memberType)) {
          row[member.name] = getPrimitiveData(memberType);
          continue;
        }

        row[member.name] = getCustomData(member);
      }
      generatedType.data.push(row);
    });
    generatedTypes.push(generatedType);
  }
  return generatedTypes;
};
