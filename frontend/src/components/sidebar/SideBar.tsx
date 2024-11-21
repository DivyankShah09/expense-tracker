// import { useNavigate, useLocation } from "react-router-dom";
// import { ReactTyped } from "react-typed";
// import logo from "../../assets/logo.png";
// import dashboard from "../../assets/icons/dashboard.png";
// import income from "../../assets/icons/income.png";
// import expense from "../../assets/icons/expense.png";
// import profile from "../../assets/icons/profile.png";
// import signout from "../../assets/icons/signout.png";
// import dashboardActive from "../../assets/icons/dashboard-active.png";
// import incomeActive from "../../assets/icons/income-active.png";
// import expenseActive from "../../assets/icons/expense-active.png";
// import profileActive from "../../assets/icons/profile-active.png";

// const SideBar = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // Get the current route path

//   // Helper function to check if the route is the current path
//   const isActive = (path: string) => location.pathname === path;

//   const handleSignOut = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const handleCollapse = () => {};

//   return (
//     <div className="w-full border-r-primary shadow-right h-full p-2">
//       <div className="relative inset-x-0 top-0 flex flex-row items-center p-1">
//         <img
//           src={logo}
//           alt="Logo"
//           className="aspect-square w-6 rounded-[50%] border-primary border-[1px]"
//         />
//         <h1 className="ml-2 text-base text-logo font-semibold overflow-hidden inline-block">
//           <ReactTyped
//             strings={["Expense Tracker"]}
//             typeSpeed={100}
//             showCursor={false}
//           />
//         </h1>
//       </div>
//       {/* TO DO: Add Icons */}
//       <ul>
//         <li
//           className={`my-3 px-2 text-base cursor-pointer rounded-2xl flex gap-2 ${
//             isActive("/dashboard")
//               ? "bg-selected text-primary font-bold"
//               : "hover:bg-selected"
//           }`}
//           onClick={() => {
//             navigate("/dashboard");
//           }}
//         >
//           {isActive("/dashboard") ? (
//             <img
//               src={dashboardActive}
//               alt="dashboard-active"
//               className="w-[17px] h-[17px] my-2"
//             />
//           ) : (
//             <img
//               src={dashboard}
//               alt="dashboard"
//               className="w-[17px] h-[17px] my-2"
//             />
//           )}
//           <span className="border-2-red text-xl my-1">Dashboard</span>
//         </li>
//         <li
//           className={`my-2 p-2 font-medium text-base cursor-pointer rounded-2xl flex gap-2 ${
//             isActive("/add-income")
//               ? "bg-selected text-primary"
//               : "hover:bg-selected"
//           }`}
//           onClick={() => {
//             navigate("/add-income");
//           }}
//         >
//           {isActive("/add-income") ? (
//             <img
//               src={incomeActive}
//               alt="income-active"
//               className="w-[17px] h-[17px] my-2"
//             />
//           ) : (
//             <img src={income} alt="income" className="w-[17px] h-[17px] my-2" />
//           )}
//           <span className="border-2-red text-xl my-1">Add Income</span>
//         </li>
//         <li
//           className={`my-2 p-2 font-medium text-base cursor-pointer rounded-2xl flex gap-2 ${
//             isActive("/add-expense")
//               ? "bg-selected text-primary"
//               : "hover:bg-selected"
//           }`}
//           onClick={() => {
//             navigate("/add-expense");
//           }}
//         >
//           {isActive("/add-expense") ? (
//             <img
//               src={expenseActive}
//               alt="expense-active"
//               className="w-[17px] h-[17px] my-2"
//             />
//           ) : (
//             <img
//               src={expense}
//               alt="expense"
//               className="w-[17px] h-[17px] my-2"
//             />
//           )}
//           <span className="border-2-red text-xl my-1">Add Expense</span>
//         </li>
//         <li
//           className={`my-2 p-2 font-medium text-base cursor-pointer rounded-2xl flex gap-2 ${
//             isActive("/profile")
//               ? "bg-selected text-primary"
//               : "hover:bg-selected"
//           }`}
//           onClick={() => {
//             navigate("/profile");
//           }}
//         >
//           {isActive("/profile") ? (
//             <img
//               src={profileActive}
//               alt="profile-active"
//               className="w-[17px] h-[17px] my-2"
//             />
//           ) : (
//             <img
//               src={profile}
//               alt="profile"
//               className="w-[17px] h-[17px] my-2"
//             />
//           )}
//           <span className="border-2-red text-xl my-1">Profile</span>
//         </li>
//         <li
//           className="my-2 p-2 font-medium text-base cursor-pointer flex gap-2"
//           onClick={handleSignOut}
//         >
//           <img src={signout} alt="signout" className="w-[17px] h-[17px] my-2" />
//           <span className="border-2-red text-xl my-1">Sign Out</span>
//         </li>
//         <li
//           className="my-2 p-2 font-medium text-base cursor-pointer flex gap-2"
//           onClick={handleCollapse}
//         >
//           <img src={signout} alt="signout" className="w-[17px] h-[17px] my-2" />
//           <span className="border-2-red text-xl my-1">Collapse</span>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default SideBar;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactTyped } from "react-typed";
import logo from "../../assets/logo.png";
import dashboard from "../../assets/icons/dashboard.png";
import income from "../../assets/icons/income.png";
import expense from "../../assets/icons/expense.png";
import profile from "../../assets/icons/profile.png";
import signout from "../../assets/icons/signout.png";
import collapse from "../../assets/icons/collapse.png";
import expand from "../../assets/icons/expand.png";
import dashboardActive from "../../assets/icons/dashboard-active.png";
import incomeActive from "../../assets/icons/income-active.png";
import expenseActive from "../../assets/icons/expense-active.png";
import profileActive from "../../assets/icons/profile-active.png";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route path

  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage collapse

  // Helper function to check if the route is the current path
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`h-full p-2 border-r-primary shadow-right transition-all ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="relative flex items-center p-1">
        <img
          src={logo}
          alt="Logo"
          className={`aspect-square rounded-full border-primary border-[1px] ${
            isCollapsed ? "w-8" : "w-6"
          }`}
        />
        {!isCollapsed && (
          <h1 className="ml-2 text-base text-logo font-semibold overflow-hidden">
            <ReactTyped
              strings={["Expense Tracker"]}
              typeSpeed={100}
              showCursor={false}
            />
          </h1>
        )}
      </div>

      <ul>
        {[
          {
            path: "/dashboard",
            label: "Dashboard",
            icon: dashboard,
            activeIcon: dashboardActive,
          },
          {
            path: "/add-income",
            label: "Add Income",
            icon: income,
            activeIcon: incomeActive,
          },
          {
            path: "/add-expense",
            label: "Add Expense",
            icon: expense,
            activeIcon: expenseActive,
          },
          {
            path: "/profile",
            label: "Profile",
            icon: profile,
            activeIcon: profileActive,
          },
        ].map(({ path, label, icon, activeIcon }) => (
          <li
            key={path}
            className={`my-3 px-2 cursor-pointer rounded-2xl flex items-center gap-2 ${
              isActive(path)
                ? "bg-selected text-primary font-bold"
                : "hover:bg-selected"
            }`}
            onClick={() => navigate(path)}
          >
            <img
              src={isActive(path) ? activeIcon : icon}
              alt={label}
              className={`w-[17px] h-[17px] ${
                isCollapsed ? "my-2 mx-auto" : "my-2"
              }`}
            />
            {!isCollapsed && <span className="text-xl">{label}</span>}
          </li>
        ))}

        <li
          className="my-3 px-2 cursor-pointer rounded-2xl flex items-center gap-2 hover:bg-selected"
          onClick={handleSignOut}
        >
          <img
            src={signout}
            alt="Sign Out"
            className={`w-[17px] h-[17px] ${
              isCollapsed ? "my-2 mx-auto" : "my-2"
            }`}
          />
          {!isCollapsed && <span className="text-xl">Sign Out</span>}
        </li>
        <li
          className="my-3 px-2 cursor-pointer rounded-2xl flex items-center gap-2 hover:bg-selected"
          onClick={toggleCollapse}
        >
          <img
            src={isCollapsed ? expand : collapse}
            alt="Collapse/Expand"
            className={`w-[17px] h-[17px] ${
              isCollapsed ? "my-2 mx-auto" : "my-2"
            }`}
          />
          {!isCollapsed && <span className="text-xl">Collapse</span>}
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
