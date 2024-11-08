interface SidebarProps {
  className: string;
}
const SideBar = ({ className }: SidebarProps) => {
  return (
    <>
      <div className="w-full">
        <ul>
          <li>Dashboard</li>
          <li>Add Income</li>
          <li>Add Expense</li>
          <li>Profile</li>
          <li>Sign Out</li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
