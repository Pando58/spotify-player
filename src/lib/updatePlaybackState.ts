import type { Dispatch } from "react";
import type { spotifyApi } from "./spotifyApi";
import type { AppDispatchCtxType } from "@/context/appContext";

export function updatePlaybackState(spotify: typeof spotifyApi, dispatch: Dispatch<AppDispatchCtxType> | null) {
  if (!dispatch) return;

  spotify.getPlayingTrack().then(res => {
    dispatch({
      type: "setPlaybackState",
      state: res,
    });

    if (res.context?.type !== "playlist" || res.item?.type !== "track") return;

    const playlistId = res.context.uri.replace("spotify:playlist:", "");

    spotify.getPlaylist(playlistId).then(res => {
      dispatch({
        type: "setPlayingPlaylist",
        playlistId: res.id,
      });
    });
  });
}
