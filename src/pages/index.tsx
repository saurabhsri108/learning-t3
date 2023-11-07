import Head from "next/head";
import ClerkAuthButton from "~/components/ClerkAuthButton";
import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";
import { logoClicked } from "~/events/home";
import Chirps from "~/components/Chirps";
import ChirpEditor from "~/components/ChirpEditor";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const user = useUser();
  console.log(user);
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
      <main className="flex min-h-screen items-start justify-start">
        <div className="container mx-auto flex h-screen flex-col items-center justify-start px-4 py-8">
          {homeContent()}
        </div>
      </main>
    </>
  );
}
