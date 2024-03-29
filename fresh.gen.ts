// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_500.tsx";
import * as $2 from "./routes/_app.tsx";
import * as $3 from "./routes/_middleware.ts";
import * as $4 from "./routes/about.tsx";
import * as $5 from "./routes/api/joke.ts";
import * as $6 from "./routes/api/trpc/[path].ts";
import * as $7 from "./routes/auth.tsx";
import * as $8 from "./routes/callback.tsx";
import * as $9 from "./routes/debug_auth.tsx";
import * as $10 from "./routes/directory/[userId].tsx";
import * as $11 from "./routes/directory/index.tsx";
import * as $12 from "./routes/following.tsx";
import * as $13 from "./routes/index.tsx";
import * as $14 from "./routes/likes.tsx";
import * as $15 from "./routes/notification.tsx";
import * as $16 from "./routes/posts/[postId]/edit.tsx";
import * as $17 from "./routes/posts/[postId]/index.tsx";
import * as $18 from "./routes/posts/new.tsx";
import * as $19 from "./routes/search.tsx";
import * as $20 from "./routes/signout.tsx";
import * as $21 from "./routes/users/[userId].tsx";
import * as $$0 from "./islands/AllPosts.tsx";
import * as $$1 from "./islands/FollowingPosts.tsx";
import * as $$2 from "./islands/Header.tsx";
import * as $$3 from "./islands/LikePosts.tsx";
import * as $$4 from "./islands/PostEdit.tsx";
import * as $$5 from "./islands/PostNew.tsx";
import * as $$6 from "./islands/PostView.tsx";
import * as $$7 from "./islands/SearchedPosts.tsx";
import * as $$8 from "./islands/UserPosts.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_500.tsx": $1,
    "./routes/_app.tsx": $2,
    "./routes/_middleware.ts": $3,
    "./routes/about.tsx": $4,
    "./routes/api/joke.ts": $5,
    "./routes/api/trpc/[path].ts": $6,
    "./routes/auth.tsx": $7,
    "./routes/callback.tsx": $8,
    "./routes/debug_auth.tsx": $9,
    "./routes/directory/[userId].tsx": $10,
    "./routes/directory/index.tsx": $11,
    "./routes/following.tsx": $12,
    "./routes/index.tsx": $13,
    "./routes/likes.tsx": $14,
    "./routes/notification.tsx": $15,
    "./routes/posts/[postId]/edit.tsx": $16,
    "./routes/posts/[postId]/index.tsx": $17,
    "./routes/posts/new.tsx": $18,
    "./routes/search.tsx": $19,
    "./routes/signout.tsx": $20,
    "./routes/users/[userId].tsx": $21,
  },
  islands: {
    "./islands/AllPosts.tsx": $$0,
    "./islands/FollowingPosts.tsx": $$1,
    "./islands/Header.tsx": $$2,
    "./islands/LikePosts.tsx": $$3,
    "./islands/PostEdit.tsx": $$4,
    "./islands/PostNew.tsx": $$5,
    "./islands/PostView.tsx": $$6,
    "./islands/SearchedPosts.tsx": $$7,
    "./islands/UserPosts.tsx": $$8,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
