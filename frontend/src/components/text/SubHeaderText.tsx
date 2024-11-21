export const SubHeaderText = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return <h1 className={`text-2xl font-bold ${className}`}>{label}</h1>;
};
