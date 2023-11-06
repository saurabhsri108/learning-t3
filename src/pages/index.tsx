import Head from "next/head";
import ClerkAuthButton from "~/components/ClerkAuthButton";
import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.post.getAll.useQuery();
  console.log(data);
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
          <ClerkAuthButton />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </main>
    </>
  );
}
