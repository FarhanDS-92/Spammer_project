import { API_URL } from "@/lib/API_URL.js";
import PostAndButtons from "./PostAndButtons.jsx";

export default async function PostsAndComments({ post }) {
  const res = await fetch(`${API_URL}/api/posts/${post.id}/comments`);
  const data = await res.json();
  const comments = data.comments;

  return (
    <>
      <PostAndButtons post={post} />
      <div className="comments">
        {comments.map((comment) => {
          return (
            <div className="replySection" key={comment.id}>
              <p className="arrow">↳</p>
              <li> {comment.text} </li>
            </div>
          );
        })}
      </div>
    </>
  );
}
