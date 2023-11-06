import Head from "next/head";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const user = useUser();
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
      <main className="flex min-h-screen items-start justify-start">
        <div className="container mx-auto flex h-screen flex-col items-center justify-center px-4">
          {!user.isSignedIn && (
            <SignInButton>
              <button className="border border-transparent bg-slate-800 px-4 py-4 font-medium text-slate-50 hover:border-slate-950 hover:bg-slate-50 hover:text-slate-950 focus:bg-slate-50 focus:text-slate-950 active:border-slate-950 active:bg-slate-50 active:text-slate-950">
                Sign in with clerk
              </button>
            </SignInButton>
          )}
          {!!user.isSignedIn && (
            <SignOutButton>
              <button className="border border-transparent bg-slate-800 px-4 py-4 font-medium text-slate-50 hover:border-slate-950 hover:bg-slate-50 hover:text-slate-950 focus:bg-slate-50 focus:text-slate-950 active:border-slate-950 active:bg-slate-50 active:text-slate-950">
                Logout
              </button>
            </SignOutButton>
          )}
        </div>
      </main>
    </>
  );
}
