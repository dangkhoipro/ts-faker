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
  - DataType["URL"]
  - DataType["EMAIL"]
  - DataType['dynamic']['number|1-120'] (min?-max?)
  - DataType['SENTENCE']
  - DataType['dynamic']['SENTENCE|20'] (20 words)
  - DataType['AUTO_INCREMENT_NUMBER']
  - DataType['UUID']
  - DataType['dynamic']['Array|item1,item2,item3']
*/

interface Person {
  userName: DataType['USER_NAME'];
  firstName: DataType['FIRST_NAME'];
  lastName: DataType['LAST_NAME'];
  age: DataType['dynamic']['number|1-120'];
  dob: Date;
  sex: DataType['dynamic']['Array|male,female']
  profileUrl: DataType['URL'];
  email: DataType['EMAIL'];
  detail: DataType['dynamic']['SENTENCE|20'];
}

interface Product {
  id: number;
  title: string;
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
        const dataType = `enum ECustomData {
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
        
        type DataType = Record<ECustomData, string> & {
          dynamic: {
            [dynamicType: string]: string;
          };
        };`;
        monaco.languages.typescript.typescriptDefaults.addExtraLib(dataType, "dataType.ts");
      }}
    />
  );
};

export default Monaco;
