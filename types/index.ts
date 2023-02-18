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

export enum MemberOtherData {
  USER_NAME = "USER_NAME",
  FIRST_NAME = "FIRST_NAME",
  FULL_NAME = "FULL_NAME",
  LAST_NAME = "LAST_NAME",
  PRICE = "PRICE",
  DESCRIPTION = "DESCRIPTION",
}

type DataType = {
  USER_NAME: string;
  FIRST_NAME: string;
  FULL_NAME: string;
  LAST_NAME: string;
  PRICE: string;
  DESCRIPTION: string;
  [x: string]: string;
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
} as const;
