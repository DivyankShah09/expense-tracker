import React from "react";
import DatePicker from "react-datepicker";

export interface DatePickerInputProps {
  label?: string;
  labelPosition: "top" | "left";
  value?: string;
  divClassName?: string;
  inputClassName?: string;
  onChange?: (value: string) => void;
}

const DatePickerInput = ({
  label,
  labelPosition,
  divClassName,
  inputClassName,
  value,
  onChange,
}: DatePickerInputProps) => {
  const handleChange = (date: Date | null) => {
    if (date) {
      onChange && onChange(date.toISOString().split("T")[0]);
    }
  };
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
        <DatePicker
          className={`border-gray-400 border-2 rounded-md h-12 px-2 disabled:border-gray-200 w-full ${inputClassName}`}
          value={value}
          onChange={handleChange}
          dateFormat="yyyy-MM-dd"
          placeholderText={new Date().toISOString().split("T")[0]}
        />
      </div>
    </>
  );
};

export default DatePickerInput;
