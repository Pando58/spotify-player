import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
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
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const [value, setValue] = useState(val);
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    if (holding) return;
    setValue(val);
  }, [val, holding]);

  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
    onChange?.(e);
  }

  return (
    <div className="relative">
      <div className="h-1 w-full rounded-full bg-gray-500">
        <div
          className="h-full rounded-full bg-white"
          style={{
            width: mapRange(value || 0, min, max, 0, 100) + "%",
          }}
        />
      </div>
      <input
        type="range"
        className="slider absolute top-0 left-0 h-1 w-full"
        value={value}
        min={min}
        max={max}
        onChange={inputChange}
        onPointerDown={() => setHolding(true)}
        onPointerUp={() => setHolding(false)}
      />
    </div>
  );
}
