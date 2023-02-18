import { getOtherType, transform } from "../core";
import { DataItem, GeneratedType, MemberType } from "../types";
import { OPTIONS } from "../config";
import { GeneratorLib } from ".";

const primativeTypeToData: Record<MemberType, () => any> = {
  [MemberType.BOOLEAN]: () => GeneratorLib.boolean(),
  [MemberType.STRING]: () => GeneratorLib.string(),
  [MemberType.NUMBER]: () => GeneratorLib.number(),
  [MemberType.DATE]: () => GeneratorLib.datetime(),
  [MemberType.ARRAY_STRING]: () => [...Array(3)].map((index) => GeneratorLib.string()),
  [MemberType.ARRAY_NUMBER]: () => [...Array(3)].map((index) => GeneratorLib.number()),
};

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
        if (primativeTypeToData[memberType] != null) {
          row[member.name] = primativeTypeToData[memberType]();
          continue;
        }

        row[member.name] = getOtherType(member);
      }
      generatedType.data.push(row);
    });
    generatedTypes.push(generatedType);
  }
  return generatedTypes;
};
