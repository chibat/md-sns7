// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/_app.tsx";
import * as $2 from "./routes/api/create_comment.ts";
import * as $3 from "./routes/api/create_follow.ts";
import * as $4 from "./routes/api/create_like.ts";
import * as $5 from "./routes/api/create_post.ts";
import * as $6 from "./routes/api/delete_comment.ts";
import * as $7 from "./routes/api/delete_follow.ts";
import * as $8 from "./routes/api/delete_like.ts";
import * as $9 from "./routes/api/delete_post.ts";
import * as $10 from "./routes/api/get_comments.ts";
import * as $11 from "./routes/api/get_like_users.ts";
import * as $12 from "./routes/api/is_liked.ts";
import * as $13 from "./routes/api/joke.ts";
import * as $14 from "./routes/api/update_post.ts";
import * as $15 from "./routes/callback.tsx";
import * as $16 from "./routes/index.tsx";
import * as $17 from "./routes/post.tsx";
import * as $18 from "./routes/posts/[postId]/index.tsx";
import * as $19 from "./routes/signout.tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/Header.tsx";
import * as $$2 from "./islands/NewPost.tsx";
import * as $$3 from "./islands/PostView.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/_app.tsx": $1,
    "./routes/api/create_comment.ts": $2,
    "./routes/api/create_follow.ts": $3,
    "./routes/api/create_like.ts": $4,
    "./routes/api/create_post.ts": $5,
    "./routes/api/delete_comment.ts": $6,
    "./routes/api/delete_follow.ts": $7,
    "./routes/api/delete_like.ts": $8,
    "./routes/api/delete_post.ts": $9,
    "./routes/api/get_comments.ts": $10,
    "./routes/api/get_like_users.ts": $11,
    "./routes/api/is_liked.ts": $12,
    "./routes/api/joke.ts": $13,
    "./routes/api/update_post.ts": $14,
    "./routes/callback.tsx": $15,
    "./routes/index.tsx": $16,
    "./routes/post.tsx": $17,
    "./routes/posts/[postId]/index.tsx": $18,
    "./routes/signout.tsx": $19,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/Header.tsx": $$1,
    "./islands/NewPost.tsx": $$2,
    "./islands/PostView.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
