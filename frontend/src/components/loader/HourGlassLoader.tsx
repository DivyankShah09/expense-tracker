import { hourglass } from "ldrs";

export const HourGlassLoader = () => {
  hourglass.register();
  return (
    <div className="border-2 w-full h-[85vh] flex">
      <div className="m-auto opacity-50">
        <l-hourglass
          size="150"
          bg-opacity="0.1"
          speed="1.8"
          color="#b189fa"
        ></l-hourglass>
      </div>
    </div>
  );
};
