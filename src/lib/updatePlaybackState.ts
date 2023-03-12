import type { Dispatch } from "react";
import type { spotifyApi } from "./spotifyApi";
import type { AppDispatchCtxType } from "@/context/appContext";

export function updatePlaybackState(spotify: typeof spotifyApi, dispatch: Dispatch<AppDispatchCtxType> | null) {
  if (!dispatch) return;

  spotify.getPlayingTrack().then(res => {
    if (!res.ok) return;

    dispatch({
      type: "setPlaybackState",
      state: res.value,
    });

    if (res.value.context?.type !== "playlist" || res.value.item?.type !== "track") return;

    const playlistId = res.value.context.uri.replace("spotify:playlist:", "");

    spotify.getPlaylist(playlistId).then(res => {
      if (!res.ok) return;

      dispatch({
        type: "setPlayingPlaylist",
        playlistId: res.value.id,
      });
    });
  });
}
