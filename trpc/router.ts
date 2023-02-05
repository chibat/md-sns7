import { z } from "zod";
import { hello } from "~/trpc/procedures/hello.ts";
import { publicProcedure, trpc } from "~/trpc/context.ts";
import { getComments } from "~/trpc/procedures/getComments.ts";

const posts = [{ name: "first post" }];

const router = trpc.router;

export const appRouter = router({
  hello,
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
