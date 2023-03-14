import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { spotifyApi } from "@/lib/spotifyApi";
import type { MySession } from "@/pages/api/auth/[...nextauth]";

export function useSpotify() {
  const { data, status } = useSession();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    const accessToken = (data as MySession).accessToken;

    if (
      status === "unauthenticated"
      || (status === "authenticated" && !data?.user)
      || !accessToken
    ) {
      signIn();
      return;
    }

    spotifyApi.setAccessToken(accessToken);
    setReady(true);
  }, [data, status]);

  return { api: spotifyApi, ready };
}
