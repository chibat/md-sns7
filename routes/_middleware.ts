import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext,
) {
  return new Response(
    '<body>This Web site has moved. <a href="https://leaves.deno.dev">leaves.deno.dev</a></body>',
    {
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}
