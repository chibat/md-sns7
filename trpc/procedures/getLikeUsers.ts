import { z } from "zod";
import { pool, selectLikeUsers } from "~/lib/db.ts";
import { defaultString } from "~/lib/utils.ts";
import { publicProcedure } from "~/trpc/context.ts";

export type User = { id: number; name: string; picture: string };

export const getLikeUsers = publicProcedure.input(
  z.object({ postId: z.number() }),
).query(async ({ input }) => {
  return (await pool((client) => selectLikeUsers(client, input.postId))).map(
    (appUser) => {
      return {
        id: appUser.id,
        name: defaultString(appUser.name),
        picture: defaultString(appUser.picture),
      } as User;
    },
  );
});
