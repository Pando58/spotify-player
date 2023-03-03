import Image from "next/image";
import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";
import spotifyLogo from "@/../public/spotifyLogoGreenWhite.svg";

export default function Login({ providers }: { providers: Providers }) {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col">
        <div className="relative h-36 w-72 sm:w-96">
          <Image
            src={spotifyLogo}
            alt="Spotify Logo"
            fill
            priority
          />
        </div>

        <div className="h-12"></div>

        {Object.values(providers).map((provider, i) => (
          <button
            className="rounded-full bg-spotify-green-cmyk p-4 font-semibold leading-none text-white"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            key={i}>Log in with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

type Providers = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
