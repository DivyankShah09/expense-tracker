import React from "react";
import { ExpenseCategoryEnum } from "../../enums/expenseCategoryEnum";

export interface SelectInputProps {
  label?: string;
  labelPosition: "top" | "left";
  placeholderText?: string;
  value?: string;
  divClassName?: string;
  onChange?: (value: string) => void;
}

const SelectInput = ({
  label,
  labelPosition,
  value,
  placeholderText,
  divClassName = "",
  onChange,
}: SelectInputProps) => {
  return (
    <>
      <div
        className={`py-2 flex ${
          labelPosition === "top" ? "flex-col" : "flex-row"
        } ${divClassName}`}
      >
        <h1
          className={`text-primary font-semibold text-lg text-left ${
            labelPosition === "top" ? "mb-1" : ""
          }`}
        >
          {label}
        </h1>
        <select
          className="h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
          value={value}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
        >
          <option value="" disabled hidden>
            {placeholderText}
          </option>
          {Object.values(ExpenseCategoryEnum).map((category) => (
            <option key={category} value={category}>
              {category
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectInput;
