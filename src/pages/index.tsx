import Head from "next/head";
import { useContext, useEffect, useReducer } from "react";
import { Sidebar } from "@/components/Sidebar";
import TracklistView from "@/components/TracklistView";
import HomeView from "@/components/homeView/HomeView";
import Player from "@/components/player/Player";
import { appContextReducer, AppDispatchContext, AppContext } from "@/context/appContext";
import { useSpotify } from "@/hooks/useSpotify";
import { updatePlaybackState } from "@/lib/updatePlaybackState";

export default function Home() {
  const ctx = useContext(AppContext);
  const [appCtx, dispatch] = useReducer(appContextReducer, ctx);
  const spotify = useSpotify();

  useEffect(() => {
    if (!spotify.ready) return;

    updatePlaybackState(spotify.api, dispatch);
    const interval = setInterval(() => updatePlaybackState(spotify.api, dispatch), 2000);

    return () => clearInterval(interval);
  }, [spotify.ready]);

  const bottomBarHeight = 6;

  return (
    <AppContext.Provider value={appCtx}>
      <AppDispatchContext.Provider value={dispatch}>
        <Head>
          <title>{
            appCtx.playbackState?.item
              ? appCtx.playbackState.item.name + " • Spotify Player"
              : "Spotify Player"
          }</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex h-screen">
          <div className="flex-none">
            <Sidebar bottomSpace={bottomBarHeight} />
          </div>
          <div className="flex-1">
            {{
              home: <HomeView bottomSpace={bottomBarHeight} />,
              tracklist: <TracklistView bottomSpace={bottomBarHeight} />,
            }[appCtx.activeView]}
          </div>
        </div>
        <Player barHeight={bottomBarHeight} />
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}
