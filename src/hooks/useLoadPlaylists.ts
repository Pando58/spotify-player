import { useEffect, useState } from "react";
import { useSpotify } from "./useSpotify";

export function useLoadPlaylists() {
  const spotify = useSpotify();
  const [firstLoad, setFirstLoad] = useState(true);
  const [gotAllPlaylists, setGotAllPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState<{ name: string; id: string }[]>([]);

  const limit = 50;

  function loadNextPlaylistSet() {
    spotify.api.getUserPlaylists(playlists.length, limit).then(res => {
      setPlaylists(prev => [...prev, ...res.items.map(({ name, id }) => ({ name, id }))]);

      if (res.items.length < limit) {
        setGotAllPlaylists(true);
      }
    });
  }

  useEffect(() => {
    if (!spotify.ready) return;

    if (firstLoad) {
      loadNextPlaylistSet();
      setFirstLoad(false);
    }
  }, [spotify.ready]);

  return { playlists, gotAllPlaylists, loadNextPlaylistSet };
}
