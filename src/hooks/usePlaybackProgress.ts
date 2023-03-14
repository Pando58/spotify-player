import { useContext, useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";
import { AppContext } from "@/context/appContext";

export function usePlaybackProgress() {
  const appCtx = useContext(AppContext);
  const spotify = useSpotify();

  const [progress, setProgress] = useState(0);
  const [startProgress, setStartProgress] = useState<number | null>(null);

  useEffect(() => {
    if (!spotify.ready || appCtx.playbackState === null) return;

    if (startProgress === null) {
      setStartProgress(appCtx.playbackState.progress_ms);
      return;
    }

    const fetchTime = Date.now();
    const duration = appCtx.playbackState.item?.duration_ms;

    if (!startProgress || !duration) return;

    const startOffset = 1000 - (startProgress % 1000);
    let count = 0;
    let timeout: NodeJS.Timeout;

    setProgress(startProgress);

    function update() {
      if (!startProgress || !duration) return;

      setProgress(Math.min(duration, startProgress + (Date.now() - fetchTime)));

      count++;
      const offset = 200 - (Date.now() - fetchTime - startOffset - count * 200);
      timeout = setTimeout(update, offset);
    }

    timeout = setTimeout(update, startOffset);

    return () => clearTimeout(timeout);
  }, [spotify.ready, appCtx.playbackState, startProgress]);

  function updateProgress(val: number) {
    setProgress(val);
    setStartProgress(val);
  }

  return {
    progress,
    updateProgress,
  };
}
