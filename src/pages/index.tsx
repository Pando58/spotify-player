import Head from "next/head";
import MainContainer from "@/components/MainContainer";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const bottomBarHeight = 6;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen">
        <Sidebar bottomSpace={bottomBarHeight} />
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
    </>
  );
}
