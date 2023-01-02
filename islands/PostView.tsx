import { AppUser, Post } from "~/lib/db.ts";

import type { RequestType as DeleteRequest, ResponseType as DeleteResponse } from "~/routes/api/delete_post.ts";
import type { RequestType as CreateRequest, ResponseType as CreateResponse } from "~/routes/api/create_comment.ts";
import type { RequestType as DeleteCommentRequest, ResponseType as DeleteCommentResponse } from "~/routes/api/delete_comment.ts";
import type { RequestType as LikeRequest, ResponseType as LikeResponse } from "~/routes/api/create_like.ts";
import type { RequestType as CancelLikeRequest, ResponseType as CancelLikeResponse } from "~/routes/api/delete_like.ts";
import type { RequestType as CommentsRequest, ResponseType as CommentsResponse } from "~/routes/api/get_comments.ts";
import type { RequestType as IsLikedRequest } from "~/routes/api/is_liked.ts";

import { request } from "~/lib/request.ts";
import { useEffect, useState } from "preact/hooks";
import * as hljs from "highlightjs";
import { Head } from "$fresh/runtime.ts";
import LikeUsersModal from "~/components/LikeUsersModal.tsx";
import { markedWithSanitaize } from "~/lib/utils.ts";
import { marked } from "marked";

export default function PostView(props: { post: Post, user?: AppUser }) {
  const user = props.user;
  const post = props.post;

  const [flag, setFlag] = useState<boolean>(true);
  const [source, setSource] = useState<string>("");
  const [likes, setLikes] = useState<string>('0');
  const [liked, setLiked] = useState<boolean>();
  const [comments, setComments] = useState<CommentsResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [commentLoading, setCommentLoading] = useState<boolean>(true);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  function displayEdit() {
    setFlag(true);
  }

  function displayPreview() {
    setFlag(false);
  }

  async function deletePost() {
    if (confirm("Delete the post?")) {
      await request<DeleteRequest, DeleteResponse>("delete_post", { postId: post.id });
      location.href = "/";
    }
  }

  async function deleteComment(commentId: number) {
    if (confirm("Delete the comment?")) {
      await request<DeleteCommentRequest, DeleteCommentResponse>("delete_comment", { commentId });
      await readComments();
    }
  }

  async function readComments() {
    setCommentLoading(true);
    const results = await request<CommentsRequest, CommentsResponse>("get_comments", { postId: post.id });
    setCommentLoading(false);
    setComments(results);
  }

  async function reply() {
    setLoading(true);
    await request<CreateRequest, CreateResponse>("create_comment", { postId: post.id, source });
    await readComments();
    setSource("");
    setLoading(false);
  }

  async function like(postId: number) {
    setRequesting(true);
    await request<LikeRequest, LikeResponse>("create_like", { postId });
    setLiked(true);
    setLikes("" + (Number(likes) + 1));
    setRequesting(false);
  }

  async function cancelLike(postId: number) {
    setRequesting(true);
    await request<CancelLikeRequest, CancelLikeResponse>("delete_like", { postId });
    setLiked(false);
    setLikes("" + (Number(likes) - 1));
    setRequesting(false);
  }

  useEffect(() => {
    console.debug("useEffect");
    if (!post) {
      location.href = "/";
      return;
    }
    setLikes(post.likes);
    (async () => {
      const _liked = await request<IsLikedRequest, boolean>("is_liked", { postId: post.id });
      console.log("###", _liked);
      setLiked(_liked);
      await readComments();
    })();
  }, []);

  useEffect(() => {
    console.debug("useEffect");
    (hljs as any).highlightAll();
  });

  return (
    <>
      {post &&
        <>
          <Head>
            <title>Post {post.id} - md-sns</title>
            <meta property="og:url" content="https://md-sns.herokuapp.com/"></meta>
            <meta property="og:title" content={`md-sns: Post ${post.id}`}></meta>
            <meta property="og:description" content={post.source?.substring(0, 1000)?.replaceAll("\n", " ")}></meta>
            <meta property="og:image" content={post.picture} />
            <meta name="twitter:card" content="summary"></meta>
            <meta name="twitter:site" content="@tomofummy" />
            <meta name="twitter:image" content={post.picture} />
          </Head>
          <div className="card mb-3">
            <div className="card-header bg-transparent d-flex justify-content-between">
              <div>
                <img src={post.picture} alt="mdo" width="32" height="32" className="rounded-circle" />
                <a href={`/users/${post.user_id}`} className="ms-2 me-2 noDecoration">{post.name}</a>
                {new Date(post.updated_at).toLocaleString()}
              </div>
              {user?.id === post.user_id &&
                <div>
                  <a href={`/posts/${post.id}/edit`}><img src="/assets/img/pencil-fill.svg" alt="Edit" width="20" height="20"></img></a>
                  <a href={void (0)} className="ms-2" onClick={deletePost}><img src="/assets/img/trash-fill.svg" alt="Delete" width="20" height="20"></img></a>
                </div>
              }
            </div>
            <div className="card-body">
              <span dangerouslySetInnerHTML={{ __html: marked(post.source) }}></span>
            </div>
            <div className="card-footer bg-transparent">
              <div className="mb-3">
                {requesting &&
                  <div className="spinner-grow spinner-grow-sm ms-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                }
                {user && !requesting && liked &&
                  <a href={void (0)} onClick={() => cancelLike(post.id)} className="ms-3"><img src="/assets/img/heart-fill.svg" alt="Edit" width="20" height="20"></img></a>
                }
                {user && !requesting && !liked &&
                  <a href={void (0)} onClick={() => like(post.id)} className="ms-3"><img src="/assets/img/heart.svg" alt="Edit" width="20" height="20"></img></a>
                }
                {Number(likes) > 0 &&
                  <a href={void (0)} className="noDecoration ms-2" onClick={() => setModal(true)}>{likes} Like{likes === "1" ? "" : "s"}</a>
                }
              </div>
              {commentLoading &&
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
              {comments && comments.map(comment =>
                <div className="border-bottom ms-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <img src={comment.picture} alt="mdo" width="32" height="32" className="rounded-circle" />
                      <a href={`/users/${comment.user_id}`} className="ms-2 me-2 noDecoration">{comment.name}</a>
                      {new Date(comment.updated_at).toLocaleString()}
                    </div>
                    {user?.id === comment.user_id &&
                      <a href={void (0)} className="ms-2" onClick={() => deleteComment(comment.id)}><img src="/assets/img/trash-fill.svg" alt="Delete" width="20" height="20"></img></a>
                    }
                  </div>
                  <div>
                    <span dangerouslySetInnerHTML={{ __html: markedWithSanitaize(comment.source) }}></span>
                  </div>
                </div>
              )}
              {user &&
                <div className="ms-4 mt-2">
                  <div className="">
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a className={flag ? "nav-link active" : "nav-link"} onClick={displayEdit}>Edit</a>
                      </li>
                      <li className="nav-item">
                        <a className={!flag ? "nav-link active" : "nav-link"} onClick={displayPreview}>Preview</a>
                      </li>
                    </ul>
                    {flag &&
                      <textarea className="form-control mt-3" style={{ height: "250px" }} maxLength={5000} value={source} onChange={(event) =>
                        setSource((event.target as any).value)
                      } placeholder="Write a comment with markdown">
                      </textarea>
                    }
                    {!flag &&
                      <span dangerouslySetInnerHTML={{ __html: markedWithSanitaize(source) }}></span>
                    }
                  </div>
                  <div className="mt-2">
                    <button className="btn btn-primary" onClick={reply} disabled={loading || source.length === 0}>
                      {loading &&
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      }
                      Reply
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
          {modal &&
            <LikeUsersModal postId={post.id} modal={modal} setModal={setModal} />
          }
        </>
      }
    </>
  );
}