import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRef, useState } from "react";
import { api } from "~/utils/api";
import cn from "~/utils/cn";
import toast from "react-hot-toast";
import LoadingSpinner from "~/components/Loading";

export default function ChirpEditor() {
  const { user } = useUser();
  const [content, setContent] = useState("");

  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setContent("");
      void ctx.post.getAll.invalidate();
    },
    onError: (error) => {
      const message =
        error?.data?.zodError?.fieldErrors?.content![0] ?? error.message;
      toast.error(message);
      setContent("");
      void ctx.post.getAll.invalidate();
    },
  });
  const ctx = api.useUtils();

  if (!user) {
    return (
      <section className="flex w-full max-w-2xl items-center gap-3 px-4 py-4 shadow-lg shadow-slate-800">
        <div className="h-14 w-14 animate-pulse rounded-full bg-slate-100"></div>
      </section>
    );
  }

  return (
    <section className="flex w-full max-w-2xl items-start gap-3 px-4 py-4 shadow-lg shadow-slate-800">
      <Image
        src={user.imageUrl}
        alt={user.username + "profile avatar" ?? "handle profile avatar"}
        width={112}
        height={112}
        className="h-14 w-14 rounded-full"
        quality={100}
      />
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            name: `${user?.firstName} ${user?.lastName}`,
            content: content,
          };
          mutate(data);
        }}
      >
        <label htmlFor="content">
          <textarea
            name="content"
            id="content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="What is happening?"
            className={cn(
              "w-full grow border-none bg-transparent px-2 py-2" +
                " outline-none scrollbar-hide hover:border-none" +
                " hover:outline-none focus:border-none focus:outline-none" +
                " active:border-none active:outline-none",
              {},
            )}
            disabled={isPosting}
          />
        </label>
        <div className="flex items-center justify-end">
          <button
            disabled={isPosting}
            type="submit"
            className={cn(
              `my-2 flex w-full max-w-fit items-center justify-center gap-2 rounded-md bg-slate-50 px-4 py-1 text-slate-950`,
            )}
          >
            {isPosting && <LoadingSpinner size={14} />}
            <span>Post</span>
          </button>
        </div>
      </form>
    </section>
  );
}
