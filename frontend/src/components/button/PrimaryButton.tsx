export interface PrimaryButtonProps {
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  rounded?: string;
}

export const PrimaryButton = ({
  buttonText,
  onClick,
  className,
  disabled = false,
  rounded = "rounded-md",
}: PrimaryButtonProps) => {
  return (
    <button
      className={`w-fit px-4 h-12 text-1xl hover:bg-blue-950 z-5 shadow-md text-white bg-blue-500 disabled:bg-blue-400 ${className} ${rounded}`}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};
