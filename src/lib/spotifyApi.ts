import { err, ok } from "./Result";

const scopes = [
  //    Images
  // "ugc-image-upload",

  //    Spotify Connect
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",

  //    Playback
  // "app-remote-control",
  // "streaming",

  //    Playlists
  "playlist-read-private",
  "playlist-read-collaborative",
  // "playlist-modify-private",
  // "playlist-modify-public",

  //    Follow
  // "user-follow-modify",
  "user-follow-read",

  //    Listening History
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",

  //    Library
  // "user-library-modify",
  "user-library-read",

  //    Users
  "user-read-email",
  "user-read-private",
];

const params = new URLSearchParams({
  scope: scopes.join(","),
});

export const loginAuthURL = `https://accounts.spotify.com/authorize?${params.toString()}`;

export const spotifyApi = (() => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET || "";
  let accessToken = "";

  return {
    setAccessToken(token: string) {
      accessToken = token;
    },
    async refreshAccessToken(refreshToken: string) {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Authorization": "Basic " + (Buffer.from(clientId + ":" + clientSecret).toString("base64")),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: clientId,
        }),
      });

      const res = await response.json();

      if (!response.ok) {
        console.log(res);
        return err(res as {
          error: string;
          error_description: string;
        });
      }

      return ok(res as {
        access_token: string;
        token_type: string;
        expires_in: string;
        scope: string;
      });
    },
    async getUserPlaylists() {
      const response = await fetch("https://api.spotify.com/v1/me/playlists"/*  + new URLSearchParams({}).toString() */, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (!response.ok) {
        return err(res as {
          error: {
            message: string;
            status: number;
          };
        });
      }

      return ok(res as ResponseCurrentUserPlaylists);
    },
  };
})();

export type ResponseCurrentUserPlaylists = {
  href: string;
  limit: number;
  offset: number;
  next: string;
  previous: string;
  total: number;
  items: {
    collaborative: boolean;
    description: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    // owner: {}
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
  }[];
};
