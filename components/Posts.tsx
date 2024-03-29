import * as hljs from "highlightjs";
import { LikeUsersModal } from "~/components/LikeUsersModal.tsx";

import type { ResponsePost } from "~/lib/types.ts";
import { useEffect, useState } from "preact/hooks";
import { AppUser } from "~/lib/db.ts";
import { Signal } from "@preact/signals-core";
import { trpc } from "~/trpc/client.ts";
import { registerJumpElements } from "~/shortcut.ts";

type Props = {
  posts: Signal<ResponsePost[]>;
  user?: AppUser;
};

export default function Posts(props: Props) {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<number>();
  const [now] = useState<Date>(new Date());

  useEffect(() => {
    registerJumpElements(document.getElementsByClassName("card"));
  }, []);

  useEffect(() => {
    (hljs as any).highlightAll();
  });

  async function deletePost(postId: number) {
    if (confirm("Delete the post?")) {
      await trpc.deletePost.mutate({ postId });
      location.href = "/";
    }
  }

  async function like(post: ResponsePost) {
    if (!props.user) {
      location.href = "/auth";
      return;
    }
    await trpc.createLike.mutate({ postId: post.id });
    post.liked = true;
    post.likes = "" + (Number(post.likes) + 1);
    props.posts.value = [...props.posts.value];
  }

  async function cancelLike(post: ResponsePost) {
    await trpc.cancelLike.mutate({ postId: post.id });
    post.liked = false;
    post.likes = "" + (Number(post.likes) - 1);
    props.posts.value = [...props.posts.value];
  }

  function openModal(postId: number) {
    setSelectedPostId(postId);
    setModal(true);
  }

  const user = props.user;
  const posts = props.posts.value;

  return (
    <>
      {posts && posts.map((post) => (
        <div class="card mb-3" key={post.id}>
          <div class="card-header bg-transparent d-flex justify-content-between">
            <div>
              <img
                src={post.picture}
                alt="mdo"
                width="32"
                height="32"
                class="rounded-circle"
              />
              <a href={`/users/${post.user_id}`} class="ms-2 noDecoration">
                {post.name}
              </a>
            </div>
            <div>
              <a href={`/posts/${post.id}`} class="ms-2 noDecoration">
                {formatDate(now, post.updated_at)}
              </a>
            </div>
          </div>
          <div class="card-body">
            <span
              class="post"
              dangerouslySetInnerHTML={{
                __html: post.source,
              }}
            >
            </span>
            <div class="d-flex justify-content-between">
              <div>
                <a
                  class="btn btn-outline-secondary btn-sm"
                  href={user ? `/posts/${post.id}` : "/auth"}
                >
                  Comment
                </a>
                {Number(post.comments) > 0 &&
                  (
                    <a class="ms-2 noDecoration" href={`/posts/${post.id}`}>
                      {post.comments} Comment{post.comments === "1" ? "" : "s"}
                    </a>
                  )}
                {user && post.liked &&
                  (
                    <a
                      href={void (0)}
                      onClick={() => cancelLike(post)}
                      class="ms-3"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src="/assets/img/heart-fill.svg"
                        alt="Edit"
                        width="20"
                        height="20"
                      >
                      </img>
                    </a>
                  )}
                {!post.liked &&
                  (
                    <a
                      href={void (0)}
                      onClick={() => like(post)}
                      class="ms-3"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src="/assets/img/heart.svg"
                        alt="Edit"
                        width="20"
                        height="20"
                      >
                      </img>
                    </a>
                  )}
                {Number(post.likes) > 0 &&
                  (
                    <a
                      href={void (0)}
                      class="noDecoration ms-2"
                      onClick={() => openModal(post.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {post.likes} Like{post.likes === "1" ? "" : "s"}
                    </a>
                  )}
              </div>
              {user && user.id === post.user_id &&
                (
                  <div>
                    <a
                      href={void (0)}
                      class="me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => deletePost(post.id)}
                    >
                      <img
                        src="/assets/img/trash-fill.svg"
                        alt="Delete"
                        width="20"
                        height="20"
                      >
                      </img>
                    </a>
                    <a href={`/posts/${post.id}/edit`}>
                      <img
                        src="/assets/img/pencil-fill.svg"
                        alt="Edit"
                        width="20"
                        height="20"
                      >
                      </img>
                    </a>
                  </div>
                )}
            </div>
          </div>
        </div>
      ))}
      {modal && selectedPostId &&
        <LikeUsersModal postId={selectedPostId} setModal={setModal} />}
    </>
  );
}

function formatDate(now: Date, date: string) {
  const d = new Date(date);
  if (
    now.getFullYear() === d.getFullYear() && now.getMonth() === d.getMonth() &&
    now.getDate() === d.getDate()
  ) {
    return d.toLocaleTimeString();
  } else {
    return d.toLocaleDateString();
  }
}
