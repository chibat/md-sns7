import { z } from "zod";
import { hello } from "~/trpc/procedures/hello.ts";
import { publicProcedure, router } from "~/trpc/context.ts";
import { getComments } from "~/trpc/procedures/getComments.ts";
import { createComment } from "~/trpc/procedures/createComment.ts";

const posts = [{ name: "first post" }];

export const appRouter = router({
  hello,
  createComment,
  getComments,
  postGet: publicProcedure.query(() => posts),
  postCreate: publicProcedure.input(z.object({
    name: z.string(),
  })).mutation((req) => {
    posts.push(req.input);
    return req.input;
  }),
});

export type AppRouter = typeof appRouter;