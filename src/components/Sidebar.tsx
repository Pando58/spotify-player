import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { HomeIcon } from "@heroicons/react/24/outline";
// import { HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import React, { useContext, useMemo, useState } from "react";
import userImage from "@/../public/profile.jpg";
import { AppDispatchContext } from "@/context/appContext";
import { useLoadPlaylists } from "@/hooks/useLoadPlaylists";

export function Sidebar({ bottomSpace }: { bottomSpace: number }) {
  const dispatch = useContext(AppDispatchContext);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [smMenuActive, setSmMenuActive] = useState(false);
  const { playlists, gotAllPlaylists, loadNextPlaylistSet } = useLoadPlaylists();
  const { data } = useSession();

  function clickUserMenu() {
    setUserMenuActive(prev => !prev);
  }

  function logout(e: React.MouseEvent) {
    signOut();

    e.stopPropagation();
  }

  function clickPlaylist(id: string) {
    dispatch?.({
      type: "setViewingPlaylist",
      playlistId: id,
    });

    dispatch?.({
      type: "setActiveView",
      view: "tracklist",
    });
  }

  const entries = useMemo(() => ([
    {
      icon: <HomeIcon />,
      text: "Home",
      action: () => {
        dispatch?.({
          type: "setActiveView",
          view: "home",
        });
      },
    },
    /* {
      icon: <MagnifyingGlassIcon />,
      text: "Search",
    },
    {
      icon: <QueueListIcon />,
      text: "Your Library",
    },
    {
      separator: true,
    },
    {
      icon: <PlusIcon />,
      text: "Create Playlist",
    },
    {
      icon: <HeartIcon />,
      text: "Liked Songs",
    }, */
    {
      separator: true,
    },
  ]), []);

  return (
    <>
      <div className="absolute top-0 left-0 z-10 sm:hidden">
        <button className="p-3 text-white/60" onClick={() => setSmMenuActive(true)}>
          <Bars3Icon className="w-10" />
        </button>
      </div>
      <div
        className={
          "absolute top-0 left-0 z-10 sm:z-0 h-full w-screen sm:relative sm:w-auto duration-500 transition "
          + (smMenuActive ? "bg-black/30" : "pointer-events-none sm:pointer-events-auto")
        }
        data-click-outside
        onClick={(e) => (e.target as Element).hasAttribute("data-click-outside") && setSmMenuActive(false)}
      >
        <div
          className={
            "h-full w-fit duration-300 shadow-lg shadow-black/70 "
            + (!smMenuActive ? "-translate-x-full sm:translate-x-0" : "")
          }
        >
          <nav className="h-full w-56 overflow-y-auto border-r border-zinc-800 bg-zinc-950 py-2 text-sm font-medium text-zinc-400 sm:w-48 sm:text-xs lg:w-56 lg:text-sm">
            <button
              className="relative mt-2 mb-4 flex w-full items-center px-4 duration-75 hover:text-zinc-100"
              onClick={clickUserMenu}
            >
              <div className="relative h-6 w-6">
                {data?.user?.image && (
                  <Image src={data?.user?.image || userImage} className="rounded-full" fill sizes="48px" alt="user image" />
                )}
              </div>
              <span className="ml-2 text-xs lg:ml-3">{data?.user?.name}</span>
              <div className="flex-1" />
              <ChevronDownIcon className="w-4" />
              {userMenuActive && (
                <div className="absolute inset-x-0 top-full z-10">
                  <div className="mx-4 mt-2">
                    <ul className="w-full rounded bg-zinc-900 py-1 shadow-md shadow-black/30">
                      <li className="w-full py-1 px-4 text-left text-zinc-400 hover:text-zinc-100" onClick={logout}>Log out</li>
                    </ul>
                  </div>
                </div>
              )}
            </button>
            <ul>
              {entries.map(({ icon, text, action, separator }, i) => (
                <li key={i}>
                  {separator ? (
                    <hr className="my-3 mx-4 border-zinc-750" />
                  ) : (
                    <button
                      className="flex w-full items-center gap-2 py-2 px-4 duration-75 hover:text-zinc-100"
                      onClick={action}
                    >
                      <div className="w-4 lg:w-5">{icon}</div>
                      <span>{text}</span>
                    </button>
                  )}
                </li>
              ))}
              {playlists.map(({ name, id }, i) => (
                <li key={i}>
                  <button
                    className="flex w-full items-center gap-2 py-2 px-4 text-left text-zinc-400 duration-75 hover:text-zinc-100"
                    onClick={() => clickPlaylist(id)}
                  >
                    <span>{name}</span>
                  </button>
                </li>
              ))}
              {!gotAllPlaylists && (
                <li>
                  <button
                    className="mt-3 ml-2 p-2 text-xs text-zinc-400/80 duration-75 hover:text-zinc-300"
                    onClick={loadNextPlaylistSet}
                  >
                    Load more
                  </button>
                </li>
              )}
            </ul>
            <div
              className="mt-2"
              style={{
                height: bottomSpace + "rem",
              }}
            />
          </nav>
        </div>
      </div>
    </>
  );
}
