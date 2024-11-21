import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { ReactTyped } from "react-typed";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route path

  // Helper function to check if the route is the current path
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full border-r-primary shadow-right h-full p-2">
      <div className="relative inset-x-0 top-0 flex flex-row items-center p-1">
        <img
          src={logo}
          alt="Logo"
          className="aspect-square w-6 rounded-[50%] border-primary border-[1px]"
        />
        <h1 className="ml-2 text-base text-logo font-semibold overflow-hidden inline-block">
          <ReactTyped
            strings={["Expense Tracker"]}
            typeSpeed={100}
            showCursor={false}
          />
        </h1>
      </div>
      {/* TO DO: Add Icons */}
      <ul>
        <li
          className={`my-2 p-2 font-medium text-base cursor-pointer rounded-2xl${
            isActive("/dashboard")
              ? "bg-selected text-primary"
              : "hover:bg-selected"
          }`}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </li>
        <li
          className={`my-2 p-2 font-medium text-base cursor-pointer rounded-2xl ${
            isActive("/add-income")
              ? "bg-selected text-primary"
              : "hover:bg-selected"
          }`}
          onClick={() => {
            navigate("/add-income");
          }}
        >
          Add Income
        </li>
        <li
          className={`my-2 p-2 font-medium text-base cursor-pointer rounded-2xl ${
            isActive("/add-expense")
              ? "bg-selected text-primary"
              : "hover:bg-selected"
          }`}
          onClick={() => {
            navigate("/add-expense");
          }}
        >
          Add Expense
        </li>
        <li
          className={`my-2 p-2 font-medium text-base cursor-pointer rounded-2xl ${
            isActive("/profile")
              ? "bg-selected text-primary"
              : "hover:bg-selected"
          }`}
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </li>
        <li
          className="my-2 p-2 font-medium text-base cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
