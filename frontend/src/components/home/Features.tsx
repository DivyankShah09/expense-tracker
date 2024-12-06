import React from "react";
import {
  BarChart3,
  PieChart,
  CalendarClock,
  Wallet,
  TrendingUp,
  LineChart,
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function Features() {
  const features = [
    {
      icon: Wallet,
      title: "Smart Expense Tracking",
      description:
        "Effortlessly log and categorize your daily expenses with our intuitive interface",
    },
    {
      icon: CalendarClock,
      title: "Recurring Expenses",
      description:
        "Set up and manage your recurring payments to never miss a bill again",
    },
    {
      icon: TrendingUp,
      title: "Income Management",
      description:
        "Track and analyze multiple income sources to optimize your earnings",
    },
    {
      icon: BarChart3,
      title: "Monthly Analytics",
      description:
        "Visualize your expense and income trends with beautiful interactive charts",
    },
    {
      icon: PieChart,
      title: "Spending Insights",
      description:
        "Understand your spending patterns with detailed category distribution analysis",
    },
    {
      icon: LineChart,
      title: "Financial Reports",
      description:
        "Generate comprehensive reports to make informed financial decisions",
    },
  ];

  return (
    <section className="py-20 bg-primaryBackground">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Powerful Features for Better Financial Management
          </h2>
          <p className="text-secondary">
            Everything you need to take control of your finances in one place
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
