import React from "react";
import { DollarSign, TrendingUp, PiggyBank } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  positive?: boolean;
}

function StatCard({
  icon,
  label,
  value,
  trend,
  positive = true,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-primary/10 hover:border-primary/30 transition-colors duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-secondary mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-primary">{value}</h3>
        </div>
        <div
          className={`p-3 rounded-full ${
            positive ? "bg-positiveBackground" : "bg-negativeBackground"
          } shadow-sm`}
        >
          {icon}
        </div>
      </div>
      <p
        className={`mt-4 flex items-center text-sm ${
          positive ? "text-positiveText" : "text-negativeText"
        }`}
      >
        <TrendingUp className="w-4 h-4 mr-1" />
        {trend}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-12 bg-selected">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-positiveText" />}
            label="Monthly Savings"
            value="$2,450"
            trend="12% more than last month"
            positive={true}
          />
          <StatCard
            icon={<PiggyBank className="w-6 h-6 text-negativeText" />}
            label="Total Expenses"
            value="$4,120"
            trend="8% increase from last month"
            positive={false}
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-positiveText" />}
            label="Total Income"
            value="$6,570"
            trend="15% increase from last month"
            positive={true}
          />
        </div>
      </div>
    </section>
  );
}
