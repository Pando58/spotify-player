import type { Dispatch } from "react";
import { createContext } from "react";

export type AppCtxType = {
  viewingPlaylistId: string | null;
  playingPlaylistId: string | null;
  playbackState: SpotifyApi.CurrentPlaybackResponse | null;
};

export type AppDispatchCtxType = {
  type: "setViewingPlaylist";
  playlistId: string | null;
} | {
  type: "setPlayingPlaylist";
  playlistId: string | null;
} | {
  type: "setPlaybackState";
  state: SpotifyApi.CurrentPlaybackResponse;
};

export const AppContext = createContext<AppCtxType>({
  viewingPlaylistId: null,
  playingPlaylistId: null,
  playbackState: null,
});

export const AppDispatchContext = createContext<Dispatch<AppDispatchCtxType> | null>(null);

export function appContextReducer(state: AppCtxType, action: AppDispatchCtxType): AppCtxType {
  switch (action.type) {
    case "setViewingPlaylist": {
      return {
        ...state,
        viewingPlaylistId: action.playlistId,
      };
    }
    case "setPlayingPlaylist": {
      return {
        ...state,
        playingPlaylistId: action.playlistId,
      };
    }
    case "setPlaybackState": {
      return {
        ...state,
        playbackState: action.state,
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
