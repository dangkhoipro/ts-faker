import { ActionButton } from "@components/ActionButton";
import { ResizableComponent } from "@components/ResizableComponent";
import { Spinner } from "@components/Spinner";
import dynamic from "next/dynamic";
import React, { ChangeEvent, useCallback, useState } from "react";
import { SAMPLE_CODE } from "../components/CodeEditor";
import { Select } from "../components/Select";
import { SocialButtons } from "../components/SocialButtons";
import { OPTIONS } from "../config";
import { axios } from "../lib/axios";
import { GeneratedType, OutputFormat } from "../types";
import { copyData, downloadObjectAsJson, downloadObjectAsSQL } from "../utils";

const TextEditor = dynamic(import("../components/CodeEditor"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState<boolean>();
  const [options, setOptions] = useState(OPTIONS);
  const [value, setValue] = useState<string>(SAMPLE_CODE);
  const [result, setResult] = useState<GeneratedType[]>([]);

  const process = useCallback(async () => {
    setLoading(true);
    const jsonData = await axios.post("/api/generateFakeData", {
      value,
      scale: options.scale,
      numberMax: options.numberMax,
    });
    setResult(jsonData.data as unknown as GeneratedType[]);
    setLoading(false);
  }, [value, options]);

  const downloadFile = useCallback(
    (result: GeneratedType) => downloadObjectAsJson(result.data, result.name),
    []
  );

  const downloadSQLFile = useCallback((result: GeneratedType) => downloadObjectAsSQL(result), []);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setResult([]);
    setOptions({ ...options, [event.target.name]: event.target.value });
  };

  const renderHeaders = useCallback(
    (data: GeneratedType["data"]) =>
      Object.keys(data[0]).map((key, index) => (
        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500">
          {key}
        </th>
      )),
    []
  );

  return (
    <div className="overflow-hidden flex flex-row">
      <ResizableComponent className="w-2/5">
        <TextEditor
          theme="vs-dark"
          value={value}
          height={"100%"}
          onChange={(value) => setValue(value ?? "")}
        />
      </ResizableComponent>
      <div className="w-1/2 h-screen flex-1 overflow-y-auto">
        <SocialButtons />
        <div className="flex space-x-6 mx-4 mt-2">
          <Select
            name="scale"
            label="Scale (Number Of Rows)"
            options={[1, 10, 100, 200]}
            value={options.scale}
            onChange={onSelectChange}
          />
          <button
            disabled={loading}
            onClick={process}
            className={`w-40 h-10 rounded-lg bg-blue-600 text-white transition self-end ${
              !loading && "hover:bg-blue-800"
            } focus:outline-none disabled:opacity-50`}
          >
            Generate Data
          </button>
        </div>
        <div className="p-4">
          {loading && <Spinner className=" text-center" />}
          {result.map((res) => (
            <React.Fragment key={res.name}>
              <div className="pb-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {res.name}
                  <span className="text-sm text-gray-500"> (Number Of Rows: {options.scale})</span>
                </h3>
                <div className="mt-3 flex sm:mt-0 sm:ml-4">
                  <ActionButton
                    title="JSON"
                    defaultOnClick={() => copyData(res.data, OutputFormat.JSON)}
                    items={[
                      { name: "Copy", onClick: () => copyData(res.data, OutputFormat.JSON) },
                      { name: "Download", onClick: () => downloadFile(res) },
                    ]}
                  />
                  <ActionButton
                    title="SQL"
                    items={[
                      { name: "Copy", onClick: () => copyData(res, OutputFormat.SQL) },
                      { name: "Download", onClick: () => downloadSQLFile(res) },
                    ]}
                  />
                </div>
              </div>
              <div className="overflow-auto mb-5 max-h-[400px]">
                <table className="table-auto shadow">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>{renderHeaders(res.data)}</tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {res.data.map((dt, i) => (
                      <tr key={i} className="even:bg-gray-100">
                        {Object.values(dt).map((k, kIndex) => (
                          <td
                            key={kIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm max-w-xs truncate"
                          >
                            {`${k}`}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
