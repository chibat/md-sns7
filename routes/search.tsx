import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { AppUser } from "~/lib/db.ts";
import Header from "~/islands/Header.tsx";
import { getSession } from "~/lib/auth.ts";
import SearchedPosts from "~/islands/SearchedPosts.tsx";

type PageType = {
  loginUser?: AppUser;
};

export const handler: Handlers<PageType> = {
  async GET(req, ctx) {
    const session = await getSession(req);
    const res = await ctx.render({ loginUser: session?.user });
    return res;
  },
};

export default function Page(props: PageProps<PageType>) {
  const searchParams = props.url.searchParams.get("value") || "";
  return (
    <>
      <Head>
        <title>Search:{searchParams} - md-sns</title>
        <meta property="og:title" content={`Search:${searchParams} - md-sns`}>
        </meta>
        <meta
          property="og:description"
          content={`Search:${searchParams} - md-sns`}
        >
        </meta>
        <meta
          property="og:image"
          content="https://md-sns.deno.dev/assets/img/icon-192x192.png"
        />
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@tomofummy" />
        <meta
          name="twitter:image"
          content="https://md-sns.deno.dev/assets/img/icon-192x192.png"
        />
      </Head>
      <Header user={props.data.loginUser} />
      <main class="container">
        <h1>Search</h1>
        <form class="mb-3" method="GET" action="/search">
          <input
            class="form-control"
            type="text"
            name="value"
            value={searchParams}
            placeholder="Input search words"
            autoFocus
          />
        </form>
        {searchParams &&
          (
            <SearchedPosts
              searchWord={searchParams}
              loginUser={props.data.loginUser}
            />
          )}
      </main>
    </>
  );
}
