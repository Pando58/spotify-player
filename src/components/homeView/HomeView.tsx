import PlaylistCard from "./PlaylistCard";
import { useLoadPlaylists } from "@/hooks/useLoadPlaylists";

export default function HomeView({ bottomSpace }: { bottomSpace: number }) {
  const { playlists, gotAllPlaylists, loadNextPlaylistSet } = useLoadPlaylists();

  return (
    <main className="relative h-full overflow-x-auto text-white/90">
      <div className="p-5">
        <h2 className="mb-6 text-xl font-semibold">Your playlists</h2>

        <div className="flex flex-wrap">
          {playlists.map((playlist, i) => (
            <PlaylistCard playlist={playlist} key={i} />
          ))}
        </div>

        {!gotAllPlaylists && (
          <button
            className="mx-4 mt-8 p-2 text-sm font-semibold text-white/70"
            onClick={loadNextPlaylistSet}
          >
            Load more
          </button>
        )}
      </div>
      <div
        className="mt-2"
        style={{
          height: bottomSpace + "rem",
        }}
      />
    </main>
  );
}
