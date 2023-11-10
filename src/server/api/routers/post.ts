import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { clerkClient, type User } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

function filterUserForClient(user: User) {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
  };
}

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.query.posts.findMany({
      limit: 100,
    });
    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId!),
        limit: 100,
      })
    ).map(filterUserForClient);

    // console.log(posts, users);
    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);

      if (!author) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Author for post not found",
        });
      }

      return {
        post,
        author,
      };
    });
  }),
  create: privateProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(1, `Name cannot be empty`)
          .max(256, `Name cannot be greater than 256 letters`),
        content: z
          .string()
          .min(1, `Content cannot be empty`)
          .max(280, `Content cannot be greater than 280 letters`),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit(ctx.userId);
      if (!success)
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Only 3 chirps allowed per minute",
        });
      await new Promise((resolve) => setTimeout(resolve, 10000));
      const post = await ctx.db.insert(posts).values({
        name: input.name,
        authorId: ctx.userId,
        content: input.content,
      });
      return post;
    }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),
});
