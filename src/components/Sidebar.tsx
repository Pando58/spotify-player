import { HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

export function Sidebar() {
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
    <div className="h-screen w-48 overflow-y-auto border-r border-zinc-800 bg-zinc-950 py-2">
      <ul>
        {entries.map(({ icon, text, separator }, i) => (
          <li key={i}>
            {separator ? (
              <hr className="my-3 mx-4 border-zinc-750" />
            ) : (
              <button className="flex w-full items-center gap-2 py-2 px-4 text-xs font-medium text-zinc-400 duration-75 hover:text-zinc-100 sm:text-sm">
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
    </div>
  );
}
