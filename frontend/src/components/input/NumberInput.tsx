import React from "react";

export interface NumberInputProps {
  label?: string;
  labelPosition: "top" | "left";
  placeholderText?: string;
  value?: number;
  type?: React.HTMLInputTypeAttribute | undefined;
  divClassName?: string;
  inputClassName?: string;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export const NumberInput = ({
  label,
  labelPosition,
  value,
  placeholderText,
  divClassName = "",
  inputClassName = "",
  type = "number",
  onChange,
  disabled = false,
  ...props
}: NumberInputProps) => {
  return (
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
      <input
        {...props}
        className={`border-gray-400 border-2 rounded-md h-12 px-2 disabled:border-gray-200 ${inputClassName}`}
        type={type}
        placeholder={placeholderText}
        value={value}
        onChange={(e) => {
          const numberValue = parseFloat(e.target.value);
          if (!isNaN(numberValue)) {
            onChange && onChange(numberValue);
          } else {
            onChange && onChange(0); // or handle empty input as needed
          }
        }}
        disabled={disabled}
      ></input>
    </div>
  );
};
