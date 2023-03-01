import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useMemo } from "react";
import userImage from "@/../public/profile.jpg";

export function Sidebar({ bottomSpace }: { bottomSpace: number }) {
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
    <nav className="h-full w-48 overflow-y-auto border-r border-zinc-800 bg-zinc-950 py-2 text-xs font-medium text-zinc-400 sm:w-56 sm:text-sm">
      <button className="mt-2 mb-4 flex w-full items-center gap-3 px-4 duration-75 hover:text-zinc-100 sm:gap-4">
        <div className="h-6 w-6">
          <Image src={userImage} className="rounded-full" alt="user image" />
        </div>
        <span>John Doe</span>
        <div className="flex-1" />
        <ChevronDownIcon className="w-4" />
      </button>
      <ul>
        {entries.map(({ icon, text, separator }, i) => (
          <li key={i}>
            {separator ? (
              <hr className="my-3 mx-4 border-zinc-750" />
            ) : (
              <button className="flex w-full items-center gap-2 py-2 px-4 duration-75 hover:text-zinc-100">
                <div className="w-4 sm:w-5">{icon}</div>
                <span>{text}</span>
              </button>
            )}
          </li>
        ))}
        {/* {[...Array(10)].map((_, i) => (
          <li key={i}>
            <button className="flex w-full items-center gap-2 py-2 px-4 text-xs font-medium text-zinc-400 duration-75 hover:text-zinc-100 sm:text-sm">
              <span>Playlist {i}</span>
            </button>
          </li>
        ))} */}
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
