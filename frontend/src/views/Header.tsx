import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { PrimaryButton } from "../components/button/PrimaryButton";
import { ReactTyped } from "react-typed";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sticky top-0 h-[10vh]">
      <div className="flex w-full h-full p-4 border-b-primary shadow-primary shadow-sm z-20 border-2 bg-white justify">
        <div className="flex w-full justify">
          <a href="/">
            <div className="relative inset-x-0 top-0 flex flex-row items-center">
              <img
                src={logo}
                alt="Logo"
                className="aspect-square w-12 rounded-[50%] border-primary border-[2px]"
              />
              <h1 className="ml-1 text-2xl text-logo font-semibold overflow-hidden inline-block">
                <ReactTyped
                  strings={["Expense Tracker"]}
                  typeSpeed={100}
                  showCursor={false}
                />
              </h1>
            </div>
          </a>
        </div>
        <div className="flex justify-end w-full">
          <ul className="relative flex flex-row p-1">
            <li
              className={`text-xl font-medium px-2 py-2 mx-3 rounded-lg cursor-pointer ${
                isActive("/") ? "bg-selected text-primary" : "hover:bg-selected"
              }`}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className={`text-xl font-medium px-2 py-2 mx-3 rounded-lg cursor-pointer ${
                isActive("/about-us")
                  ? "bg-selected text-primary"
                  : "hover:bg-selected"
              }`}
              onClick={() => {
                navigate("/about-us");
              }}
            >
              About Us
            </li>
          </ul>
          <PrimaryButton
            className={`mr-4`}
            rounded="rounded-lg"
            onClick={() => {
              navigate("/login");
            }}
            buttonText="Login"
          />
        </div>
      </div>
    </div>
  );
};
