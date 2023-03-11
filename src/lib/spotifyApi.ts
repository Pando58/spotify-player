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
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (!response.ok) {
        return err(res as SpotifyError);
      }

      return ok(res as SpotifyApi.ListOfCurrentUsersPlaylistsResponse);
    },
    async getPlaylistTracks(playlistId: string) {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (!response.ok) {
        return err(res as SpotifyError);
      }

      return ok(res as SpotifyApi.PlaylistTrackResponse);
    },
    async getPlaylist(playlistId: string) {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (!response.ok) {
        return err(res as SpotifyError);
      }

      return ok(res as SpotifyApi.SinglePlaylistResponse);
    },
    async getPlayingTrack() {
      const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json().catch(err => console.error(err));

      if (!res) return err(null);

      if (!response.ok) {
        return err(res as SpotifyError);
      }

      return ok(res as SpotifyApi.CurrentPlaybackResponse);
    },
    async startPlayback(params?: { context_uri: string } | { uris: string[] }) {
      const response = await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: params && JSON.stringify(params),
      });

      if (!response.ok) {
        return err(await response.json() as SpotifyError);
      }

      return ok(null);
    },
    async pausePlayback() {
      const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return err(await response.json() as SpotifyError);
      }

      return ok(null);
    },
    async skipToNext() {
      const response = await fetch("https://api.spotify.com/v1/me/player/next", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return err(await response.json() as SpotifyError);
      }

      return ok(null);
    },
    async skipToPrevious() {
      const response = await fetch("https://api.spotify.com/v1/me/player/previous", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return err(await response.json() as SpotifyError);
      }

      return ok(null);
    },
    async setVolume(volume: number) {
      const response = await fetch("https://api.spotify.com/v1/me/player/volume?" + new URLSearchParams({
        volume_percent: volume.toString(),
      }).toString(), {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return err(await response.json() as SpotifyError);
      }

      return ok(null);
    },
    async setRepeat(on: boolean) {
      const response = await fetch("https://api.spotify.com/v1/me/player/repeat?" + new URLSearchParams({
        state: on ? "context" : "off",
      }).toString(), {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return err(await response.json() as SpotifyError);
      }

      return ok(null);
    },
    async setShuffle(on: boolean) {
      const response = await fetch("https://api.spotify.com/v1/me/player/shuffle?" + new URLSearchParams({
        state: on.toString(),
      }).toString(), {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return err(await response.json() as SpotifyError);
      }

      return ok(null);
    },
  };
})();

type SpotifyError = {
  error: {
    message: string;
    status: number;
  };
};
