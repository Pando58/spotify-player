import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";
import type { ChangeEvent } from "react";
import { useState } from "react";
import Slider from "../Slider";
import { useDebounce } from "@/hooks/useDebounce";
import { useSpotify } from "@/hooks/useSpotify";

export default function VolumeSlider() {
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
      <div className={"w-28 " + (muted ? "opacity-60" : "")}>
        <Slider
          min={0}
          max={100}
          val={volume}
          onChange={volumeChange}
        />
      </div>
      <span className="w-[4ch] text-left">{volume}%</span>
    </>
  );
}
