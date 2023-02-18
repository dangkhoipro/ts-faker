import { ChangeEvent } from "react";

type TOption = string | number | { key: string | number; value: string };

interface SelectProps {
  name: string;
  label: string;
  options: TOption[];
  defaultValue?: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = (props: SelectProps) => (
  <div className="">
    <label className="block text-sm font-medium text-gray-500">{props.label}</label>
    <select
      name={props.name}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map((op, index) => (
        <option key={index}>{getOptionValue(op)}</option>
      ))}
    </select>
  </div>
);

function getOptionValue(option: TOption) {
  if (typeof option === "string" || typeof option === "number") {
    return option;
  }

  return option.value;
}
