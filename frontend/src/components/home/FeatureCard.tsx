import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30">
      <div className="bg-primaryBackground w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <Icon className="h-7 w-7 text-primary group-hover:text-buttonText transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
      <p className="text-secondary leading-relaxed">{description}</p>
    </div>
  );
}