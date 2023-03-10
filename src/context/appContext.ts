import type { Dispatch } from "react";
import { createContext } from "react";

export type AppCtxType = {
  viewingPlaylistId: string | null;
  playingPlaylistId: string | null;
  playingTrackId: string | null;
  isPlaying: boolean;
};

export type AppDispatchCtxType = {
  type: "setViewingPlaylist";
  playlistId: AppCtxType["viewingPlaylistId"];
} | {
  type: "setPlayingPlaylist";
  playlistId: AppCtxType["playingPlaylistId"];
} | {
  type: "setPlayingTrack";
  trackId: AppCtxType["playingTrackId"];
} | {
  type: "setPlaying";
  playing: boolean;
};

export const AppContext = createContext<AppCtxType>({
  viewingPlaylistId: null,
  playingPlaylistId: null,
  playingTrackId: null,
  isPlaying: false,
});

export const AppDispatchContext = createContext<Dispatch<AppDispatchCtxType> | null>(null);
