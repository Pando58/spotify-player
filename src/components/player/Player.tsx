import { BackwardIcon, ForwardIcon, PlayIcon, PauseIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useContext } from "react";
import RepeatButton from "./RepeatButton";
import ShuffleButton from "./ShuffleButton";
import VolumeSlider from "./volumeSlider";
import { AppContext, AppDispatchContext } from "@/context/appContext";
import { useSpotify } from "@/hooks/useSpotify";
import { msToSongTime } from "@/lib/msToSongTime";
import { updatePlaybackState } from "@/lib/updatePlaybackState";

export default function Player({
  barHeight,
}: {
  barHeight: number;
}) {
  const appCtx = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const spotify = useSpotify();

  function play() {
    if (appCtx.playbackState?.is_playing) {
      spotify.api.pausePlayback().then(() => updatePlaybackState(spotify.api, dispatch));

      return;
    }

    spotify.api.startPlayback().then(() => updatePlaybackState(spotify.api, dispatch));
  }

  function clickPrevious() {
    spotify.api.skipToPrevious();
  }

  function clickNext() {
    spotify.api.skipToNext();
  }

  return (
    <div
      className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-zinc-850 bg-zinc-900/50 shadow-t-lg shadow-black/20 backdrop-blur-lg"
      style={{ height: barHeight + "rem" }}
    >
      <div className="flex h-full text-xs font-medium text-white/70">
        <div className="flex h-full flex-1 p-5">
          <div className="relative aspect-square h-full shadow-lg shadow-black/50">
            {(appCtx.playbackState?.item?.type === "track" && appCtx.playbackState.item.album.images?.[0].url) && (
              <Image src={appCtx.playbackState.item.album.images[0].url} fill sizes="128px" alt="playing track cover image" />
            )}
          </div>
          <div className="flex flex-col justify-center gap-1 px-4">
            <div className="text-sm text-white">{appCtx.playbackState?.item?.name}</div>
            <div>{appCtx.playbackState?.item?.type === "track" && appCtx.playbackState.item.artists.map((i => i.name)).join(", ")}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="flex justify-center gap-4">
            <button
              className="hover:text-white"
              onClick={clickPrevious}
            >
              <BackwardIcon className="w-6" />
            </button>
            <button
              className="text-white"
              onClick={play}
            >
              {appCtx.playbackState?.is_playing ? (
                <PauseIcon className="w-6" />
              ) : (
                <PlayIcon className="w-6" />
              )}
            </button>
            <button
              className="hover:text-white"
              onClick={clickNext}
            >
              <ForwardIcon className="w-6" />
            </button>
          </div>
          <div className="mb-1 flex items-center gap-2">
            <span>{msToSongTime(appCtx.playbackState?.progress_ms || 0)}</span>
            <div className="h-1 w-[40vw] rounded-full bg-gray-500">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width: ((appCtx.playbackState?.progress_ms || 0) / (appCtx.playbackState?.item?.duration_ms || 1) * 100) + "%",
                }}
              />
            </div>
            <span>{msToSongTime(appCtx.playbackState?.item?.duration_ms || 0)}</span>
          </div>
        </div>
        <div className="flex-1 p-5">
          <div className="flex h-full items-center justify-end gap-2">
            <ShuffleButton />
            <div className="mr-2">
              <RepeatButton />
            </div>
            <VolumeSlider />
          </div>
        </div>
      </div>
    </div>
  );
}
