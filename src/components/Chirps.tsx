import { api } from "~/utils/api";
import Image from "next/image";
import { posts } from "~/server/db/schema";
import { speak } from "~/utils/speak";

export default function Chirps() {
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (!data) {
    return <section>Something went wrong!</section>;
  }

  return (
    <section className="mx-auto my-6 flex w-full max-w-2xl flex-col items-center justify-center gap-3">
      {data.map(({ post: chirp, author }) => (
        <section
          key={chirp.id}
          className="w-full border border-slate-800 px-4 py-4"
          tabIndex={0}
          onFocus={() => speak(chirp.content)}
        >
          <Image
            src={author.imageUrl}
            alt={author.username + "profile avatar" ?? "user profile avatar"}
            width={112}
            height={112}
            className="h-14 w-14 rounded-full"
            quality={100}
          />
          <section>
            <h3>{`@${author.username ?? "nonameyet"}`}</h3>
            <p>{chirp.content}</p>
          </section>
        </section>
      ))}
    </section>
  );
}
