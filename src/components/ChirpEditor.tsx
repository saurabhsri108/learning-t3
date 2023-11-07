import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function ChirpEditor() {
  const { user } = useUser();

  if (!user) {
    return (
      <section className="flex w-full max-w-2xl items-center gap-3 px-4 py-4 shadow-lg shadow-slate-800">
        <div className="h-14 w-14 animate-pulse rounded-full bg-slate-100"></div>
      </section>
    );
  }

  return (
    <section className="flex w-full max-w-2xl items-center gap-3 px-4 py-4 shadow-lg shadow-slate-800">
      <Image
        src={user.imageUrl}
        alt={user.username + "profile avatar" ?? "user profile avatar"}
        width={112}
        height={112}
        className="h-14 w-14 rounded-full"
        quality={100}
      />
      <form className="w-full">
        <label htmlFor="content">
          <input
            type="text"
            name="content"
            id="content"
            placeholder="What is happening?"
            className="w-full grow border-none bg-transparent outline-none hover:border-none hover:outline-none focus:border-none focus:outline-none active:border-none active:outline-none"
          />
        </label>
      </form>
    </section>
  );
}
