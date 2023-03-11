import { useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSpotify } from "@/hooks/useSpotify";

export default function VolumeSlider() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [volume, setVolume] = useState(50);
  const spotify = useSpotify();

  function adjustVolume() {
    spotify.api.setVolume(volume);
  }

  useDebounce(adjustVolume, [volume], 300);

  return (
    <div className="relative w-28">
      <div className="h-1 w-full rounded-full bg-gray-500">
        <div
          className="h-full rounded-full bg-white"
          style={{
            width: volume + "%",
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
        onChange={e => setVolume(Number(e.target.value))}
      />
    </div>
  );
}
