import { api } from "~/utils/api";
import Image from "next/image";
import { speak } from "~/utils/speak";
import { formatDistance } from "date-fns";
import LoadingSpinner from "~/components/Loading";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Chirps() {
  const router = useRouter();
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) {
    return (
      <section
        className="mx-auto my-6 mt-16 flex w-full max-w-2xl flex-col items-center justify-center gap-3"
        tabIndex={0}
        onFocus={() => speak("Loading chirps...")}
      >
        <LoadingSpinner size={64} />
      </section>
    );
  }

  if (!data) {
    return (
      <section
        className="mx-auto my-6 flex w-full max-w-2xl flex-col items-center justify-center gap-3"
        tabIndex={0}
        onFocus={() => speak("Error: Someone killed the bird")}
      >
        <p className="font-sans text-xl font-bold">
          Error: Someone killed the bird!
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto my-6 flex w-full max-w-2xl flex-col items-center justify-center gap-3">
      {data.map(({ post: chirp, author }) => (
        <Link
          href={`/${author.id}/status/${chirp.id}`}
          key={chirp.id}
          className="flex w-full items-start gap-4 border border-slate-800 px-4 py-4"
          tabIndex={0}
          onFocus={() =>
            speak(
              `Chirp by ${author.firstName} ${
                author.lastName
              }, ${formatDistance(new Date(chirp.createdAt), new Date(), {
                includeSeconds: true,
                addSuffix: true,
              })}, ${chirp.content}`,
            )
          }
        >
          <Image
            src={author.imageUrl}
            alt={
              `${author.firstName} ${author.lastName} profile avatar` ??
              `user profile avatar`
            }
            width={80}
            height={80}
            className="inline-flex h-10 w-10 rounded-full"
            quality={100}
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await router.push(`/${author.id}`);
            }}
          />
          <section className="flex flex-col items-start justify-center gap-2">
            <div className="flex items-center justify-center gap-1 text-slate-400">
              <span>{`${author.firstName} ${author.lastName}`}</span>
              <span className="relative top-[-6px] mx-1 text-2xl">.</span>
              <span>
                {formatDistance(new Date(chirp.createdAt), new Date(), {
                  includeSeconds: true,
                  addSuffix: true,
                })}
              </span>
            </div>
            <p>{chirp.content}</p>
          </section>
        </Link>
      ))}
    </section>
  );
}
