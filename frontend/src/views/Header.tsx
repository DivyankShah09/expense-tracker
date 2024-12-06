import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { PrimaryButton } from "../components/button/PrimaryButton";
import { ReactTyped } from "react-typed";

interface HeaderProps {
  className: string;
  logoColor: string;
}

export const Header = ({ className, logoColor }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={`${className} sticky top-0 h-[10vh]`}>
      <div className="flex w-full h-full p-4 justify">
        <div className="flex w-full justify">
          <a href="/">
            <div className="relative inset-x-0 top-0 flex flex-row items-center">
              <img src={logo} alt="Logo" className="aspect-square w-12" />
              <h1
                className={`${logoColor} ml-1 text-2xl  font-semibold overflow-hidden inline-block`}
              >
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
