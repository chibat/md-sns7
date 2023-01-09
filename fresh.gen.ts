// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_500.tsx";
import * as $2 from "./routes/_app.tsx";
import * as $3 from "./routes/about.tsx";
import * as $4 from "./routes/api/create_comment.ts";
import * as $5 from "./routes/api/create_follow.ts";
import * as $6 from "./routes/api/create_like.ts";
import * as $7 from "./routes/api/create_post.ts";
import * as $8 from "./routes/api/delete_comment.ts";
import * as $9 from "./routes/api/delete_follow.ts";
import * as $10 from "./routes/api/delete_like.ts";
import * as $11 from "./routes/api/delete_post.ts";
import * as $12 from "./routes/api/get_comments.ts";
import * as $13 from "./routes/api/get_follow_info.ts";
import * as $14 from "./routes/api/get_follower_users.ts";
import * as $15 from "./routes/api/get_following_users.ts";
import * as $16 from "./routes/api/get_like_users.ts";
import * as $17 from "./routes/api/get_liked_posts.ts";
import * as $18 from "./routes/api/get_posts.ts";
import * as $19 from "./routes/api/is_liked.ts";
import * as $20 from "./routes/api/joke.ts";
import * as $21 from "./routes/api/update_post.ts";
import * as $22 from "./routes/auth.tsx";
import * as $23 from "./routes/callback.tsx";
import * as $24 from "./routes/directory/[userId].tsx";
import * as $25 from "./routes/directory/index.tsx";
import * as $26 from "./routes/following.tsx";
import * as $27 from "./routes/index.tsx";
import * as $28 from "./routes/likes.tsx";
import * as $29 from "./routes/notification.tsx";
import * as $30 from "./routes/posts/[postId]/edit.tsx";
import * as $31 from "./routes/posts/[postId]/index.tsx";
import * as $32 from "./routes/posts/new.tsx";
import * as $33 from "./routes/signout.tsx";
import * as $34 from "./routes/users/[userId].tsx";
import * as $$0 from "./islands/AllPosts.tsx";
import * as $$1 from "./islands/FollowingPosts.tsx";
import * as $$2 from "./islands/Header.tsx";
import * as $$3 from "./islands/LikePosts.tsx";
import * as $$4 from "./islands/PostEdit.tsx";
import * as $$5 from "./islands/PostNew.tsx";
import * as $$6 from "./islands/PostView.tsx";
import * as $$7 from "./islands/UserPosts.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_500.tsx": $1,
    "./routes/_app.tsx": $2,
    "./routes/about.tsx": $3,
    "./routes/api/create_comment.ts": $4,
    "./routes/api/create_follow.ts": $5,
    "./routes/api/create_like.ts": $6,
    "./routes/api/create_post.ts": $7,
    "./routes/api/delete_comment.ts": $8,
    "./routes/api/delete_follow.ts": $9,
    "./routes/api/delete_like.ts": $10,
    "./routes/api/delete_post.ts": $11,
    "./routes/api/get_comments.ts": $12,
    "./routes/api/get_follow_info.ts": $13,
    "./routes/api/get_follower_users.ts": $14,
    "./routes/api/get_following_users.ts": $15,
    "./routes/api/get_like_users.ts": $16,
    "./routes/api/get_liked_posts.ts": $17,
    "./routes/api/get_posts.ts": $18,
    "./routes/api/is_liked.ts": $19,
    "./routes/api/joke.ts": $20,
    "./routes/api/update_post.ts": $21,
    "./routes/auth.tsx": $22,
    "./routes/callback.tsx": $23,
    "./routes/directory/[userId].tsx": $24,
    "./routes/directory/index.tsx": $25,
    "./routes/following.tsx": $26,
    "./routes/index.tsx": $27,
    "./routes/likes.tsx": $28,
    "./routes/notification.tsx": $29,
    "./routes/posts/[postId]/edit.tsx": $30,
    "./routes/posts/[postId]/index.tsx": $31,
    "./routes/posts/new.tsx": $32,
    "./routes/signout.tsx": $33,
    "./routes/users/[userId].tsx": $34,
  },
  islands: {
    "./islands/AllPosts.tsx": $$0,
    "./islands/FollowingPosts.tsx": $$1,
    "./islands/Header.tsx": $$2,
    "./islands/LikePosts.tsx": $$3,
    "./islands/PostEdit.tsx": $$4,
    "./islands/PostNew.tsx": $$5,
    "./islands/PostView.tsx": $$6,
    "./islands/UserPosts.tsx": $$7,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
