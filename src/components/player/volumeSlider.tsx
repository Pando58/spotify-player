import { useRef, useState } from "react";

export default function VolumeSlider() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [vol, setVol] = useState(50);

  return (
    <div className="relative w-28">
      <div className="h-1 w-full rounded-full bg-gray-500">
        <div
          className="h-full rounded-full bg-white"
          style={{
            width: vol + "%",
            // width: (6 + vol * 0.88) + "%",
          }}
        />
      </div>
      <input
        className='range-sm absolute top-0 left-0 h-1 w-full opacity-0'
        ref={inputRef}
        type="range"
        min={0}
        max={100}
        onChange={e => setVol(Number(e.target.value))}
      />
    </div>
  );
}
