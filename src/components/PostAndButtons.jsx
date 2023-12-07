"use client";

import { API_URL } from "@/lib/API_URL.js";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function PostAndButtons({ post }) {
  // comment states
  const [showComment, setShowComment] = useState(false);
  const [commenting, setCommenting] = useState("");
  const [errorComment, setErrorComment] = useState("");

  // editing post states
  const [showPost, setShowPost] = useState(true);
  const [posting, setPosting] = useState(post.text);
  const [errorPost, setErrorPost] = useState("");

  const router = useRouter();

  // Like method
  async function handleLike() {
    const res = await fetch(`${API_URL}/api/posts/${post.id}/likes`, {
      method: "POST",
      cache: "no-store",
    });
    router.refresh();
  }

  // Comment Reply Section
  function handleComment() {
    setShowComment(true);
  }
  function handleCommentCancel() {
    setShowComment(false);
  }
  async function handleSubmitComment(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/posts/${post.id}/comments`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commenting,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setErrorComment(data.error);
    } else {
      setShowComment(false);
      setErrorComment("");
      router.refresh();
    }
  }

  // Delete Button
  async function handleDelete() {
    await fetch(`${API_URL}/api/posts/${post.id}`, {
      method: "DELETE",
      cache: "no-store",
    });
    router.refresh();
  }

  // Edit Post
  function handleEdit() {
    setShowPost(false);
  }
  function handlePostCancel() {
    setShowPost(true);
  }
  async function handleSubmitPost(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/posts/${post.id}`, {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: posting,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setErrorPost(data.error);
    } else {
      setErrorPost("");

      setShowPost(true);
      router.refresh();
    }
  }

  return (
    <>
      <div className="post">
        {showPost ? (
          <p id="postText">{post.text}</p>
        ) : (
          <form onSubmit={handleSubmitPost}>
            <input
              type="text"
              value={posting}
              onChange={(e) => setPosting(e.target.value)}
            />
            <button>Edit Post</button>
            <button type="button" onClick={handlePostCancel}>
              Cancel
            </button>
            <p>{errorPost}</p>
          </form>
        )}
        <div className="btn-container">
          <p className="likes">{post.likes}</p>
          <button className="btn" onClick={handleLike}>
            👍
          </button>
          <button className="btn" onClick={handleComment}>
            💬
          </button>
          <button className="btn" onClick={handleDelete}>
            🗑️
          </button>
          <button className="btn" onClick={handleEdit}>
            ✏️
          </button>
        </div>
      </div>

      {showComment ? (
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={commenting}
            onChange={(e) => setCommenting(e.target.value)}
          />
          <button>Comment</button>
          <button type="button" onClick={handleCommentCancel}>
            Cancel
          </button>
          <p>{errorComment}</p>
        </form>
      ) : null}
    </>
  );
}
