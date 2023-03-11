import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useSpotify } from "@/hooks/useSpotify";

export default function RepeatButton() {
  const [repeat, setRepeat] = useState(false);
  const spotify = useSpotify();

  function toggleRepeat() {
    spotify.api.setRepeat(!repeat);
    setRepeat(prev => !prev);
  }

  return (
    <button
      className={"hover:text-white " + (repeat ? "text-white" : "")}
      title="Repeat"
      onClick={toggleRepeat}
    >
      <ArrowUturnLeftIcon className="w-4" />
    </button>
  );
}
