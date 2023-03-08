import type { Dispatch } from "react";
import { createContext } from "react";

export type AppCtxType = {
  viewingPlaylistId: string | null;
};

export type AppDispatchCtxType = {
  type: "set_viewingPlaylistId";
  playlistId: AppCtxType["viewingPlaylistId"];
};

export const AppContext = createContext<AppCtxType>({
  viewingPlaylistId: null,
} as AppCtxType);

export const AppDispatchContext = createContext<Dispatch<AppDispatchCtxType> | null>(null);
