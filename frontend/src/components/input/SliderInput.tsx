import { useState } from "react";

interface SliderInputProps {
  label: string;
  minValue: number;
  maxValue: number;
  value: number;
  onChange?: (value: number) => void;
}

const SliderInput = ({
  label,
  value,
  minValue,
  maxValue,
  onChange,
}: SliderInputProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    setTooltipPosition(Math.round(value));
  };

  return (
    <div className="slider-container flex flex-row gap-2 py-2">
      <label htmlFor="slider" className="block text-lg font-medium h-12 p-2">
        {label}
      </label>
      <span className="py-3">{minValue}</span>
      <div className="relative w-full">
        <input
          id="slider"
          type="range"
          min={minValue}
          max={maxValue}
          value={value}
          onChange={(e) => {
            onChange && onChange(Number(e.target.value));
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onMouseMove={handleMouseMove}
          className="w-full accent-slider my-4"
        />
        {showTooltip && (
          <div
            className="absolute bottom-10 left-0 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded"
            style={{
              left: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
            }}
          >
            {tooltipPosition}
          </div>
        )}
      </div>
      <span className="py-3">{maxValue}</span>
    </div>
  );
};

export default SliderInput;
