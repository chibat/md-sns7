import { z } from "zod";
import { publicProcedure } from "~/trpc/context.ts";
import { insertLike, pool } from "~/lib/db.ts";
import { getSession } from "~/lib/auth.ts";

export const createLike = publicProcedure.input(
  z.object({ postId: z.number() }),
).mutation(async ({ input, ctx }) => {
  const session = await getSession(ctx.req);
  if (!session) {
    return null; // TODO
  }
  await pool((client) =>
    insertLike(client, {
      userId: session.user.id,
      postId: input.postId,
    })
  );
  return {};
});
