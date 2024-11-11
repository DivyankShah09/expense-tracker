export const Header2Text = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return <h1 className={`text-xl font-bold ${className}`}>{label}</h1>;
};
