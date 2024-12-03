import React from "react";

export interface SelectInputProps {
  label?: string;
  labelPosition?: "top" | "left";
  placeholderText?: string;
  value?: string;
  divClassName?: string;
  options: Record<string, string>;
  onChange?: (value: string) => void;
}

const SelectInput = ({
  label,
  labelPosition,
  value,
  placeholderText,
  divClassName = "",
  options,
  onChange,
}: SelectInputProps) => {
  return (
    <>
      <div
        className={`py-2 flex ${
          labelPosition === "top" ? "flex-col" : "flex-row"
        } ${divClassName}`}
      >
        {label && (
          <h1
            className={`text-primary font-semibold text-lg text-left ${
              labelPosition === "top" ? "mb-1" : ""
            }`}
          >
            {label}
          </h1>
        )}
        <select
          className="h-12 w-full rounded-md border-2 border-primaryHover px-2 focus:outline-primary"
          value={value}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
        >
          <option value="" disabled hidden>
            {placeholderText}
          </option>
          {Object.values(options).map((category) => (
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
