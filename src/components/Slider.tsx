import { useState } from "react";
import { mapRange } from "@/lib/mapRange";

export default function Slider({
  min = 0,
  max = 100,
  val,
  onChange,
}: {
  min?: number;
  max?: number;
  val?: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const [value, setValue] = useState(processValue(val || 0));

  function processValue(v: number) {
    return Math.min(Math.max(v, min), max);
  }

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = processValue(Number(e.target.value));
    setValue(val);
    onChange(e);
  }

  return (
    <div className="relative">
      <div className="h-1 w-full rounded-full bg-gray-500">
        <div
          className="h-full rounded-full bg-white"
          style={{
            width: mapRange(value, min, max, 0, 100) + "%",
          }}
        />
      </div>
      <input
        type="range"
        className="slider range-sm absolute top-0 left-0 h-1 w-full"
        value={value}
        min={min}
        max={max}
        onChange={inputChange}
      />
    </div>
  );
}
