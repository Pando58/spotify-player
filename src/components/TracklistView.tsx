import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
// import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
import palette from "image-palette";
import moment from "moment";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext, AppDispatchContext } from "@/context/appContext";
import { useSpotify } from "@/hooks/useSpotify";
import { msToSongTime } from "@/lib/msToSongTime";
import { updatePlaybackState } from "@/lib/updatePlaybackState";

export default function TracklistView({ bottomSpace }: { bottomSpace: number }) {
  const appCtx = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);
  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>();
  const [tracks, setTracks] = useState<SpotifyApi.PlaylistTrackResponse>();
  const [bgColor, setBgColor] = useState<string>();
  const spotify = useSpotify();

  useEffect(() => {
    if (!spotify.ready || !appCtx.viewingPlaylistId) return;

    spotify.api.getPlaylist(appCtx.viewingPlaylistId).then(res => {
      setPlaylist(res);
    });

    spotify.api.getPlaylistTracks(appCtx.viewingPlaylistId).then(res => {
      setTracks(res);
    });
  }, [spotify.ready, appCtx.viewingPlaylistId]);

  function update() {
    updatePlaybackState(spotify.api, dispatch);
  }

  function playPlaylist() {
    if (!playlist) return;

    if (appCtx.playingPlaylistId === playlist?.id) {
      if (appCtx.playbackState?.is_playing) {
        spotify.api.pausePlayback().then(update);
        return;
      }

      spotify.api.startPlayback().then(update);
      return;
    }

    spotify.api.startPlayback({ context_uri: playlist.uri }).then(update);
  }

  function playTrack(id: string | undefined) {
    if (!id || !playlist || !spotify.ready) return;

    const idTrimmed = id.replace("spotify:track:", "");

    if (appCtx.playbackState?.item?.id === idTrimmed) {
      if (appCtx.playbackState?.is_playing) {
        spotify.api.pausePlayback().then(update);
        return;
      }

      spotify.api.startPlayback().then(update);
      return;
    }

    spotify.api.startPlayback({ context_uri: playlist.uri, offset: { uri: id } }).then(update);
  }

  function pause() {
    spotify.api.pausePlayback().then(update);
  }

  function imageCoverLoaded(img: HTMLImageElement) {
    const { colors } = palette(img, 6);
    const color: [number, number, number, number] = colors[2];

    const rgb = color.slice(0, -1).join(",");

    setBgColor(rgb);
  }

  return (
    <main className="relative h-full overflow-x-auto">
      <div className="absolute inset-x-0 top-0 h-[40em] duration-1000" style={{
        backgroundColor: `rgb(${bgColor})`,
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-zinc-900/100" />
      </div>
      <div className="relative flex min-h-screen flex-col">
        <header className="flex flex-col p-8 pt-14 sm:flex-row sm:pt-28">
          <div className="relative h-56 w-56 self-center bg-black/20 shadow-xl shadow-black/50">
            {playlist?.images[0] && (
              <Image
                src={playlist.images[0].url}
                fill
                sizes="224px"
                onLoadingComplete={imageCoverLoaded}
                alt="playlist cover"
              />
            )}
          </div>
          <div className="flex flex-1 flex-col justify-end pl-0 pb-4 pt-14 text-white/70 sm:pl-8 sm:pt-0">
            <h3 className="mb-4 pl-1 text-xs font-bold tracking-wider">PLAYLIST</h3>
            <h2 className="text-6xl font-bold text-white">{playlist?.name}</h2>
            <h3 className="mt-10 pl-1 text-sm font-medium">
              <span>{playlist?.owner.display_name}</span>
              <span className="mx-2">•</span>
              <span>{tracks?.total} songs</span>
            </h3>
          </div>
        </header>
        <section className="flex flex-1 flex-col text-xs font-medium text-white/70">
          <div className="flex h-16 gap-4 bg-gradient-to-b from-black/0 to-black/20 px-8 pt-4">
            <button
              className="duration-100 hover:text-white"
              onClick={playPlaylist}
            >
              {appCtx.playbackState?.is_playing && appCtx.playingPlaylistId === playlist?.id ? (
                <PauseCircleIcon className="w-12" />
              ) : (
                <PlayCircleIcon className="w-12" />
              )}
            </button>
            {/* <HeartIconOutline className="w-8" /> */}
          </div>
          <div className="flex-1 bg-black/20 px-8 pt-4">
            <div className="mx-auto max-w-screen-xl">
              <table className="w-full">
                <thead className="text-left">
                  <tr>
                    <th className="w-0">#</th>
                    <th>Title</th>
                    <th className="w-48">Date added</th>
                    <th className="w-0">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks?.items.map((track, i) => (
                    <tr
                      className="group hover:bg-white/5"
                      onDoubleClick={() => playTrack(track.track?.uri)}
                      key={i}
                    >
                      <td className="px-4">
                        <div className="w-4 text-center">
                          {appCtx.playbackState?.is_playing && appCtx.playingPlaylistId === playlist?.id && appCtx.playbackState.item?.id === track.track?.id ? (
                            <button
                              className="duration-100 hover:text-white"
                              onClick={() => pause()}
                            >
                              <PauseIcon className="w-4" />
                            </button>
                          ) : (
                            <>
                              <span className="group-hover:hidden">{i + 1}</span>
                              <button
                                className="hidden duration-100 hover:text-white group-hover:inline"
                                onClick={() => playTrack(track.track?.uri)}
                              >
                                <PlayIcon className="w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 bg-black/30">
                            {track.track?.album.images[0] && (
                              <Image src={track.track.album.images[0].url} alt="track album cover" fill sizes="40px" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 text-sm font-semibold text-white/90">
                              {track.track?.name}
                            </div>
                            <div>
                              <span>{track.track?.artists.map(({ name }) => name).join(", ")}</span>
                              <span className="mx-2">•</span>
                              <span>{track.track?.album.name}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{moment(track.added_at).fromNow()}</td>
                      <td className="px-4">{msToSongTime(track.track?.duration_ms || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="mt-2"
              style={{
                height: bottomSpace + "rem",
              }}
            />
          </div>
        </section >
      </div >
      <style jsx>{`
        th {
          font-weight: 500;
          border-bottom: 1px solid #FFF2;
          padding: 1rem 1rem 0.5rem 1rem;
        }
        td {
          padding: 1rem;
        }
      `}</style>
    </main >
  );
}
