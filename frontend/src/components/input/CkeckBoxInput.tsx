interface CheckBoxInputProps {
  divClassName?: string;
  label: string;
  value: boolean;
  onClick: (value: boolean) => void;
}

export const CheckBoxInput = ({
  divClassName = "",
  label,
  value,
  onClick,
}: CheckBoxInputProps) => {
  return (
    <>
      <div className={`py-2 flex ${divClassName}`}>
        <input
          type="checkbox"
          id="scales"
          name="recurringExpense"
          className="accent-purple-500 h-4 w-4 my-auto"
          onChange={(e) => onClick(e.target.checked)}
        />
        <h1 className={`ml-3 text-primary font-semibold text-lg text-left`}>
          {label}
        </h1>
      </div>
    </>
  );
};
