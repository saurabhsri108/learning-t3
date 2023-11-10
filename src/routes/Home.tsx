import Head from "next/head";
import ClerkAuthButton from "~/components/ClerkAuthButton";
import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";
import { logoClicked } from "~/events/home";
import Chirps from "~/components/Chirps";
import ChirpEditor from "~/components/ChirpEditor";
import { SignInButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();
  api.post.getAll.useQuery();
  const homeContent = () => {
    if (!user.isSignedIn) {
      return <SignInButton>Please login to proceed!</SignInButton>;
    }
    if (user.isSignedIn) {
      return (
        <>
          <ChirpEditor />
          <Chirps />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Head>
        <title>Chirp T3</title>
        <meta
          name="description"
          content="Chirp T3 App Learning from Theo.gg YouTube"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="border-b border-b-slate-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            onClick={() => sendGTMEvent(logoClicked)}
            className="font-bold"
          >
            Chirp T3 App
          </Link>
          <ClerkAuthButton />
        </div>
      </header>
      <main className="flex flex-1 items-start justify-start">
        <div className="container mx-auto flex flex-col items-center justify-start px-4 py-8">
          {homeContent()}
        </div>
      </main>
      <footer className="mt-auto flex flex-col items-center justify-center gap-2 border-t border-t-slate-800 py-4">
        <p className="text-lg">
          <span className="font-bold">Followed: </span>
          <Link
            href="https://youtu.be/YkOSUVzOAA4"
            className="font-bold text-yellow-200 underline"
          >
            Theo.gg T3 App Tutorial
          </Link>
          <span className="font-bold"> | tRPC, Drizzle, Upstash, etc.</span>
        </p>
        <p className="w-full border-t border-t-slate-800 pt-4 text-center text-lg font-bold">
          Press{" "}
          <code className="rounded-sm bg-slate-200 p-1 text-sm text-slate-950">
            CTRL + m
          </code>{" "}
          twice and then press{" "}
          <code className="rounded-sm bg-slate-200 p-1 text-sm text-slate-950">
            Tab
          </code>{" "}
          to select any chirp
        </p>
      </footer>
    </>
  );
}
