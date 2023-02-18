import React from "react";
import Editor from "@monaco-editor/react";

interface MonacoProps {
  theme?: string;
  language?: string;
  value?: string;
  width?: number | string;
  height?: number | string;
  options?: any;
  onChange?: (value?: string) => void;
}

export const SAMPLE_CODE = `/*
You can use some built-in data types:
  - DataType["USER_NAME"]
  - DataType["FIRST_NAME"]
  - DataType["LAST_NAME"]
  - DataType["PRICE"]
  - DataType["DESCRIPTION"]
  - DataType['number|1-120'] (min?-max?)
*/

interface Person {
  userName: DataType['USER_NAME'];
  firstName: DataType['FIRST_NAME'];
  lastName: DataType['LAST_NAME'];
  age: DataType['number|1-120'];
  bio: DataType['DESCRIPTION'];
}
`;

export const Monaco: React.FC<MonacoProps> = ({
  language,
  value,
  height,
  width,
  options,
  onChange,
  theme,
}) => {
  return (
    <Editor
      theme={theme}
      defaultLanguage={language || "typescript"}
      value={value}
      height={height}
      width={width}
      options={options}
      onChange={onChange}
      beforeMount={(monaco) => {
        const dataType = `type DataType = {
          USER_NAME: string;
          FIRST_NAME: string;
          FULL_NAME: string;
          LAST_NAME: string;
          PRICE: string;
          DESCRIPTION: string;
          [x: string]: string;
        }`;
        monaco.languages.typescript.typescriptDefaults.addExtraLib(dataType, "dataType.ts");
      }}
    />
  );
};

export default Monaco;
