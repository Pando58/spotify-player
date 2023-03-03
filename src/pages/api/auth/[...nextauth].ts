import type { User } from "next-auth";
import NextAuth from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import SpotifyProvider from "next-auth/providers/spotify";
import { loginAuthURL, spotifyApi } from "@/lib/spotifyApi";

async function refreshAccessToken(token: MyJWT) {
  const result = await spotifyApi.refreshAccessToken(token.refreshToken as string || "");

  if (!result.ok) {
    console.error(result.error);
    return token;
  }

  const response = result.value;

  return {
    ...token,
    accessToken: response.access_token,
    accessTokenExpires: (+response.expires_in || 0) * 1000,
  };
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
      authorization: loginAuthURL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: (account.expires_at || 0) * 1000,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number)) {
        return token as MyJWT;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token as MyJWT);
    },
    async session({ session, token }) {
      if (!token.user) return session;

      return {
        ...session,
        user: token.user,
        accessToken: token.accessToken,
        // error: token.error,
      };
    },
  },
});

type MyJWT = {
  accessToken: string | undefined,
  refreshToken: string | undefined,
  accessTokenExpires: number,
  user: User | AdapterUser,
}
