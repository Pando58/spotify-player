import Image from "next/image";
import { useContext } from "react";
import { AppDispatchContext } from "@/context/appContext";

export default function PlaylistCard({ playlist }: { playlist: SpotifyApi.PlaylistObjectSimplified }) {
  const dispatch = useContext(AppDispatchContext);

  function clickCard() {
    dispatch?.({
      type: "setViewingPlaylist",
      playlistId: playlist.id,
    });

    dispatch?.({
      type: "setActiveView",
      view: "tracklist",
    });
  }

  return (
    <div
      className="group m-3 w-40 cursor-pointer rounded-md bg-zinc-850 p-3 shadow-lg shadow-black/30 duration-200 hover:scale-105 hover:bg-zinc-800"
      onClick={clickCard}
    >
      <div className="relative h-0 w-full pt-[100%]">
        <div className="absolute inset-0 duration-300 group-hover:scale-105">
          {playlist.images[0] ? (
            <Image
              src={playlist.images[0].url}
              className="rounded shadow-md shadow-black/40 transition group-hover:shadow-lg group-hover:shadow-black/30"
              fill
              sizes="160px"
              alt="playlist cover image"
            />
          ) : (
            <div className="absolute inset-0 rounded bg-white/5 shadow-md shadow-black/40 transition group-hover:shadow-lg group-hover:shadow-black/30"></div>
          )}
        </div>
      </div>
      <h4 className="w-full pt-4 pb-1 text-sm font-semibold">{playlist.name}</h4>
    </div>
  );
}
