<h1 align="center"> Spotify Player </h1>

<p align="center">
  <span> Read in:&nbsp; </span>
  <a href="/README.md"> 🇺🇸 English </a>
  ·
  <a href="/README_es.md"> 🇲🇽 Spanish </a>
</p>

https://user-images.githubusercontent.com/80338911/234712575-c54f1091-fdcf-4ff1-b301-3f9263cb343e.mp4

## Introduction

This project is a Spotify front-end that allows you to see your playlists, as well as their tracks and some details. It includes a playback bar with the usual functionality and details for the currently playing song.

The project uses the Spotify API for authentication, as well as to fetch playlist, track and playback data. It was built using technologies such as TypeScript, React, Next.js, NextAuth.js and Tailwind CSS.

### Note

The project itself does not include playback functionality, it just changes the playback state on the current active device. I might add support for the [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk) in the future.

## Setup

Due to the Spotify API limitations, you need to setup your own "app" to get access to the API and manually add the accounts that will have access to it. To get started check out the [Spotify guide](https://developer.spotify.com/documentation/web-api).

After setting up your app, you will need to take note of your client ID and secret (which you can find on your app dashboard), as well as a secret string for encoding your JWTs. I recommend the JWT secret to be a random string, but it could be anything.

Once you have all of that, create a file named `.env.local` in the project root directory (where your package.json is) with the following content:

    NEXTAUTH_URL=http://localhost:3000/
    NEXT_PUBLIC_CLIENT_ID={ your client ID }
    NEXT_PUBLIC_CLIENT_SECRET={ your client secret }
    JWT_SECRET={ your JWT secret }

If you are going to deploy the app, be sure to properly set `NEXTAUTH_URL` according to your site URL, as well as configuring your Redirect URIs in your app dashboard.

After setting up all of this you should be able to run the app using `npm run dev`.
