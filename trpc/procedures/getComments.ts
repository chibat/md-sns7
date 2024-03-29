import { z } from "zod";
import { pool, selectComments } from "~/lib/db.ts";
import { publicProcedure } from "~/trpc/context.ts";
import { render } from "~/lib/markdown.ts";

export const getComments = publicProcedure.input(
  z.object({ postId: z.number() }),
).query(async ({ input }) => {
  const postId = input.postId;
  const rows = await pool((client) => selectComments(client, postId));
  return rows.map((row) => {
    return { ...row, source: render(row.source) };
  });
});
