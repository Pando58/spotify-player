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

      if (!response.ok) throw res as {
        error: string;
        error_description: string;
      };

      return res as {
        access_token: string;
        token_type: string;
        expires_in: string;
        scope: string;
      };
    },
    async getUserPlaylists(offset: number, limit: number) {
      const response = await fetch("https://api.spotify.com/v1/me/playlists?" + new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString(),
      }).toString(), {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (!response.ok) throw res as SpotifyError;

      return res as SpotifyApi.ListOfCurrentUsersPlaylistsResponse;
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

      if (!response.ok) throw res as SpotifyError;

      return res as SpotifyApi.PlaylistTrackResponse;
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

      if (!response.ok) throw res as SpotifyError;

      return res as SpotifyApi.SinglePlaylistResponse;
    },
    async getPlayingTrack() {
      const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (!response.ok) throw res as SpotifyError;

      return res as SpotifyApi.CurrentPlaybackResponse;
    },
    async startPlayback(params?: {
      context_uri: string;
      offset?: { position: number } | { uri: string };
    } | {
      uris: string[];
    }, position?: number) {
      const response = await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(({
          ...params,
          ...(typeof position === "number" && { position_ms: position }),
        })),
      });

      if (!response.ok) {
        throw await response.json() as SpotifyError;
      }
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
        throw await response.json() as SpotifyError;
      }
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
        throw await response.json() as SpotifyError;
      }
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
        throw await response.json() as SpotifyError;
      }
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
        throw await response.json() as SpotifyError;
      }
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
        throw await response.json() as SpotifyError;
      }
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
        throw await response.json() as SpotifyError;
      }
    },
  };
})();

type SpotifyError = {
  error: {
    message: string;
    status: number;
  };
};
