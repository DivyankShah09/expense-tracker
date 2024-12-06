import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
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
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primaryBackground/95 via-primaryBackground/90 to-transparent"></div>
        {/* Purple Accent Elements */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 150%, ${encodeURIComponent(
              "#b189fa"
            )}20 0%, transparent 40%),
                             radial-gradient(circle at 80% -50%, ${encodeURIComponent(
                               "#b189fa"
                             )}20 0%, transparent 30%)`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-32 md:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/20 backdrop-blur-sm text-primary px-4 py-1 rounded-full text-sm font-medium flex items-center shadow-sm">
                <Sparkles className="w-4 h-4 mr-1" />
                Smart Finance Management
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Take Control of Your{" "}
              <span className="relative">
                <span className="relative z-10">Finances</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/30 -rotate-2"></span>
              </span>
            </h1>
            <p className="text-lg text-secondary mb-8 leading-relaxed max-w-2xl backdrop-blur-sm bg-white/30 p-4 rounded-lg">
              Track expenses, monitor income, and achieve your financial goals
              with our comprehensive expense management solution. Start your
              journey to financial freedom today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button className="bg-primary text-buttonText px-8 py-4 rounded-full flex items-center gap-2 hover:bg-primaryHover transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="#"
                className="text-primary hover:text-primaryHover transition-colors font-medium flex items-center gap-1 group"
              >
                Learn more
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f5e8ff"
          />
        </svg>
      </div>
    </div>
  );
}
