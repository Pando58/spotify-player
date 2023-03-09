import Head from "next/head";
import { useContext, useReducer } from "react";
import MainContainer from "@/components/MainContainer";
import { Sidebar } from "@/components/Sidebar";
import type { AppCtxType, AppDispatchCtxType } from "@/context/appContext";
import { AppDispatchContext, AppContext } from "@/context/appContext";

export default function Home() {
  const ctx = useContext(AppContext);
  const [appCtx, dispatch] = useReducer(appContextReducer, ctx);

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
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-zinc-850 bg-black/20 shadow-t-lg shadow-black/20 backdrop-blur-md"
          style={{ height: bottomBarHeight + "rem" }}
        >
          {/*  */}
        </div>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

function appContextReducer(state: AppCtxType, action: AppDispatchCtxType): AppCtxType {
  switch (action.type) {
    case "set_viewingPlaylistId": {
      return {
        ...state,
        viewingPlaylistId: action.playlistId,
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
