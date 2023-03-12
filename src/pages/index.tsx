import Head from "next/head";
import { useContext, useEffect, useReducer } from "react";
import MainContainer from "@/components/MainContainer";
import { Sidebar } from "@/components/Sidebar";
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
  }, [spotify.ready]);

  const bottomBarHeight = 6;

  return (
    <AppContext.Provider value={appCtx}>
      <AppDispatchContext.Provider value={dispatch}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex h-screen">
          <div className="flex-none">
            <Sidebar bottomSpace={bottomBarHeight} />
          </div>
          <div className="flex-1">
            <MainContainer bottomSpace={bottomBarHeight} />
          </div>
        </div>
        <Player barHeight={bottomBarHeight} />
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}
