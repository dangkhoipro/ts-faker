import { SOURCE_PATH } from "../config";
import { GeneratedType, InterfaceTypeItem } from "../types";

export const transform = async (fileText: string): Promise<InterfaceTypeItem[]> => {
  const { Project } = await import("ts-morph");

  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      lib: ["DOM", "ESNext"],
      allowJs: false,
      noEmit: true,
      skipLibCheck: true,
      noImplicitAny: false,
      baseUrl: ".",
    },
  });

  const sourceFile = project.createSourceFile(SOURCE_PATH, fileText);
  const interfaces = sourceFile.getInterfaces().map((i) => ({
    itemName: i.compilerNode.name.getText(),
    members: i.getMembers().map((m) => ({
      name: m.compilerNode.name!.getText(),
      type: m.compilerNode.type!.getText(),
    })),
  }));

  return interfaces;
};

export const toSQL = (item: GeneratedType) => {
  let sql: string = "";
  sql += `INSERT INTO ${item.name} VALUES ${item.data
    .map(
      (m) =>
        `(${Object.values(m)
          .map((o) => `'${JSON.stringify(o)}'`)
          .join(",")})`
    )
    .join(",")}\n\n`;
  return sql;
};
