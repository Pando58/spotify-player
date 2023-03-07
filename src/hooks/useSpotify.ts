import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { spotifyApi } from "@/lib/spotifyApi";
import type { MySession } from "@/pages/api/auth/[...nextauth]";

export function useSpotify() {
  const { data, status } = useSession();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    if (status === "authenticated" && !data?.user) {
      signIn();
      return;
    }

    const accessToken = (data as MySession).accessToken || null;

    if (!accessToken) {
      return;
    }

    spotifyApi.setAccessToken(accessToken);
    setReady(true);
  }, [data, status]);

  return { api: spotifyApi, ready };
}
