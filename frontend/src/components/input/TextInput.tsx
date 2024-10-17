import React from "react";

export interface TextInputProps {
  label?: string;
  labelPosition: 'top' | 'left';
  placeholderText?: string;
  value?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  divClassName?: string;
  inputClassName?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const TextInput = ({
  label,
  labelPosition,
  value,
  placeholderText,
  divClassName = '',
  inputClassName = '',
  type = 'text',
  onChange,
  disabled = false,
  ...props
}: TextInputProps) => {
  return (
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
      <input
        {...props}
        className={`border-gray-400 border-2 rounded-md h-12 px-2 disabled:border-gray-200 ${inputClassName}`}
        type={type}
        placeholder={placeholderText}
        value={value}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        disabled={disabled}
      ></input>
    </div>
  );
};
