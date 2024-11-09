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
      className={`w-fit px-4 h-12 text-1xl text-buttonText font-bold bg-primary hover:bg-primaryHover z-5 shadow-md ${className} ${rounded}`}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};
