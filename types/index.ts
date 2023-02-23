import { strEnum } from "@utils/index";

export interface InterfaceMember {
  name: string;
  type: string;
}

export interface InterfaceTypeItem {
  itemName: string;
  members: InterfaceMember[];
}

export interface GeneratedType {
  name: string;
  data: DataItem[];
}

export type DataItem = Record<string, unknown>;

export const CustomData = strEnum([
  "USER_NAME",
  "FIRST_NAME",
  "FULL_NAME",
  "LAST_NAME",
  "PRICE",
  "EMAIL",
  "URL",
  "SENTENCE",
  "AUTO_INCREMENT_NUMBER",
  "UUID",
]);

export type TCustomData = keyof typeof CustomData;

type DataType = Record<TCustomData, string> & {
  dynamic: {
    [dynamicType: string]: string;
  };
};

export enum PrimitiveType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "Date",
  ARRAY_STRING = "string[]",
  ARRAY_NUMBER = "number[]",
}

export enum OutputFormat {
  SQL = "SQL",
  JSON = "JSON",
}

export const MyRegex = {
  DataType: /^DataType\[['"]dynamic['"]\]\[['"](?<dataType>.*)['"]\]$/,
  DynamicNumber: /^number\|(?<min>\d+)-?(?<max>\d+)?$/,
  DynamicSentence: /^SENTENCE\|?(?<length>\d+)?$/,
  ItemInArray: /^Array\|?(?<inputs>.+)?$/,
} as const;
