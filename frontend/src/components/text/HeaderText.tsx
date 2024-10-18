export const HeaderText = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <h1 className={`text-3xl text-primary font-bold ${className}`}>{label}</h1>
  );
};
