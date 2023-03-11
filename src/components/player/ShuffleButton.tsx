import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useSpotify } from "@/hooks/useSpotify";

export default function ShuffleButton() {
  const [shuffle, setShuffle] = useState(false);
  const spotify = useSpotify();

  function toggleShuffle() {
    spotify.api.setShuffle(!shuffle);
    setShuffle(prev => !prev);
  }

  return (
    <button
      className={"hover:text-white " + (shuffle ? "text-white" : "")}
      title="Shuffle"
      onClick={toggleShuffle}
    >
      <ArrowsUpDownIcon className="w-5" />
    </button>
  );
}
