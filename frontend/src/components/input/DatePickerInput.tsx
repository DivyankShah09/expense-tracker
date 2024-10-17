import React from "react";
import DatePicker from "react-datepicker";

export interface DatePickerInputProps{
  label?: string;
  labelPosition: 'top' | 'left';
  value?: string;
  divClassName?: string;
  inputClassName?: string;
  onChange?: (value: string) => void;
}

const DatePickerInput = ({
  label,
  labelPosition, divClassName, inputClassName, value, onChange }:DatePickerInputProps) => {
  const handleChange = (date: Date|null) => {
    if(date){
    onChange && onChange(date.toISOString().split("T")[0]);}
  };
  return (
    <>
      <div
      className={`py-2 flex ${
        labelPosition === 'top' ? 'flex-col' : 'flex-row'
      } ${divClassName}`}
    >
      <h1
        className={`text-primary font-semibold text-lg text-left ${
          labelPosition === 'top' ? 'mb-1' : ''
        }`}
      >
        {label}
      </h1>
        <DatePicker
          className={`${inputClassName} mb-2 h-12 w-full rounded-md border-2 border-blue-300 px-2 disabled:border-blue-200`}
          value={value}
          onChange={handleChange}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        />
      </div>
    </>
  );
};

export default DatePickerInput;
