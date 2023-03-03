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

  return {
    async refreshAccessToken(refreshToken: string) {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Authorization": "Basic " + (Buffer.from(clientId + ":" + clientSecret, "base64")),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: clientId,
        }),
      });

      if (!response.ok) {
        return err(await response.json());
      }

      return ok(await response.json() as {
        access_token: string,
        token_type: string,
        expires_in: string,
        scope: string,
      });
    },
  };
})();
