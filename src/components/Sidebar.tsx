import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import userImage from "@/../public/profile.jpg";
import { AppDispatchContext } from "@/context/appContext";
import { useSpotify } from "@/hooks/useSpotify";

export function Sidebar({ bottomSpace }: { bottomSpace: number }) {
  const { data } = useSession();
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [playlists, setPlaylists] = useState<{ name: string; id: string }[]>([]);
  const dispatch = useContext(AppDispatchContext);
  const spotify = useSpotify();

  useEffect(() => {
    if (!spotify.ready) return;

    spotify.api.getUserPlaylists().then(res => {
      if (!res.ok) return;

      const { value } = res;

      setPlaylists(value.items.map(({ name, id }) => ({ name, id })));
    });
  }, [spotify.ready]);

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
  }

  const entries = useMemo(() => ([
    {
      icon: <HomeIcon />,
      text: "Home",
    },
    {
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
    },
    {
      separator: true,
    },
  ]), []);

  return (
    <nav className="h-full w-48 overflow-y-auto border-r border-zinc-800 bg-zinc-950 py-2 text-xs font-medium text-zinc-400 lg:w-56 lg:text-sm">
      <button
        className="relative mt-2 mb-4 flex w-full items-center px-4 duration-75 hover:text-zinc-100"
        onClick={clickUserMenu}
      >
        <div className="h-6 w-6">
          {data?.user?.image &&
            <Image src={data?.user?.image || userImage} className="rounded-full" width={24} height={24} alt="user image" />
          }
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
        {entries.map(({ icon, text, separator }, i) => (
          <li key={i}>
            {separator ? (
              <hr className="my-3 mx-4 border-zinc-750" />
            ) : (
              <button className="flex w-full items-center gap-2 py-2 px-4 duration-75 hover:text-zinc-100">
                <div className="w-4 lg:w-5">{icon}</div>
                <span>{text}</span>
              </button>
            )}
          </li>
        ))}
        {playlists.map(({ name, id }, i) => (
          <li key={i}>
            <button
              className="flex w-full items-center gap-2 py-2 px-4 text-xs font-medium text-zinc-400 duration-75 hover:text-zinc-100 lg:text-sm"
              onClick={() => clickPlaylist(id)}
            >
              <span>{name}</span>
            </button>
          </li>
        ))}
      </ul>
      <div
        className="mt-2"
        style={{
          height: bottomSpace + "rem",
        }}
      />
    </nav>
  );
}
