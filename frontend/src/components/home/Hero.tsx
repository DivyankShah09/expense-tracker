import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../views/Header";

export function Hero() {
  const navigate = useNavigate();

  const callLogin = () => {
    navigate("/login");
  };
  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scaleX(-1)", // Flip horizontally
        }}
      ></div>

      {/* Content */}
      <div>
        <Header className="bg-black bg-opacity-20" logoColor="text-white" />
        <div className="container mx-auto px-6 py-40">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className=" backdrop-blur-sm  px-4 py-1 text-sm font-medium flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                Smart Finance Management
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  mb-6 leading-tight z-10">
              <span className="relative">
                Take Control of Your{" "}
                <span className="relative z-10">Finances</span>
              </span>
            </h1>
            <p className="text-lg  mb-8 leading-relaxed max-w-2xl backdrop-blur-sm bg-white/30 p-4 rounded-lg">
              Track expenses, monitor income, and achieve your financial goals
              with our comprehensive expense management solution. Start your
              journey to financial freedom today.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button
                className="bg-primaryHover text-buttonText px-8 py-4 rounded-full flex items-center gap-2 hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={callLogin}
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
