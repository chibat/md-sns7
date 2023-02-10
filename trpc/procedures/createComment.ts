import { z } from "zod";
import { insertComment, pool } from "~/lib/db.ts";
import { getSession } from "~/lib/auth.ts";
import { publicProcedure } from "~/trpc/context.ts";

export type RequestType = { postId: number; source: string };

export const createComment = publicProcedure.input(
  z.object({ postId: z.number(), source: z.string() }),
).mutation(async ({ input, ctx }) => {
  const session = await getSession(ctx.req);
  if (!session) {
    return;
  }
  if (input.source.length > 5000) {
    return;
  }
  await pool((client) =>
    insertComment(client, {
      postId: input.postId,
      userId: session.user.id,
      source: input.source,
    })
  );
});
