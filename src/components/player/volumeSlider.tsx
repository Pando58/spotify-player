import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";
import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSpotify } from "@/hooks/useSpotify";

export default function VolumeSlider() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);
  const spotify = useSpotify();

  function fetchVolume() {
    spotify.api.setVolume(!muted ? volume : 0);
  }

  useDebounce(fetchVolume, [volume, muted], 300);

  function volumeChange(e: ChangeEvent<HTMLInputElement>) {
    setVolume(Number(e.target.value));
    setMuted(false);
  }

  return (
    <>
      <button
        className="hover:text-white"
        onClick={() => setMuted(prev => !prev)}
      >
        {!muted ? (
          <SpeakerWaveIcon className="w-5" />
        ) : (
          <SpeakerXMarkIcon className="w-5" />
        )}
      </button>
      <div className={"relative w-28 " + (muted ? "opacity-60" : "")}>
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
          onChange={volumeChange}
        />
      </div>
    </>
  );
}
