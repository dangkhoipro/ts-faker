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

export enum ECustomData {
  USER_NAME = "USER_NAME",
  FIRST_NAME = "FIRST_NAME",
  FULL_NAME = "FULL_NAME",
  LAST_NAME = "LAST_NAME",
  PRICE = "PRICE",
  EMAIL = "EMAIL",
  URL = "URL",
  SENTENCE = "SENTENCE",
  AUTO_INCREMENT_NUMBER = "AUTO_INCREMENT_NUMBER",
  UUID = "UUID",
}

type DataType = {
  [x: string]: string;
  USER_NAME: string;
  FIRST_NAME: string;
  FULL_NAME: string;
  LAST_NAME: string;
  PRICE: string;
  EMAIL: string;
  URL: string;
  SENTENCE: string;
  AUTO_INCREMENT_NUMBER: string;
  UUID: string;
};

export enum MemberType {
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
  DataType: /^DataType\[['"](?<dataType>.*)['"]\]$/,
  DynamicNumber: /^number\|(?<min>\d+)-?(?<max>\d+)?$/,
  DynamicSentence: /^SENTENCE\|?(?<length>\d+)?$/,
  ItemInArray: /^Array\|?(?<inputs>.+)?$/,
} as const;
