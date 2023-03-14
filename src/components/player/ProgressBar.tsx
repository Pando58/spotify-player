import type { ChangeEvent } from "react";
import { useState, useContext } from "react";
import Slider from "../Slider";
import { AppContext, AppDispatchContext } from "@/context/appContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useSpotify } from "@/hooks/useSpotify";
import { updatePlaybackState } from "@/lib/updatePlaybackState";

export default function ProgressBar({ progress, updateProgress }: { progress: number; updateProgress: (val: number) => void }) {
  const appCtx = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [sliderValue, setSliderValue] = useState<number | null>(null);
  const spotify = useSpotify();

  useDebounce(() => {
    if (sliderValue === null || !appCtx.playbackState?.context || !appCtx.playbackState.item) {
      return;
    }

    spotify.api.startPlayback({
      context_uri: appCtx.playbackState.context.uri,
      offset: { uri: "spotify:track:" + appCtx.playbackState.item.id },
    }, sliderValue).then(() => updatePlaybackState(spotify.api, dispatch));
  }, [sliderValue], 300);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const sliderVal = Number(e.target.value);

    setSliderValue(sliderVal);
    updateProgress(sliderVal);
  }

  return (
    <Slider
      min={0}
      max={appCtx.playbackState?.item?.duration_ms || 1}
      val={progress}
      onChange={onChange}
    />
  );
}
