import { API_URL } from "@/lib/API_URL.js";
import PostAndButtons from "./PostAndButtons.jsx";

export default async function PostsAndComments({ post }) {
  const res = await fetch(`${API_URL}/api/posts/${post.id}/comments`);
  const data = await res.json();
  const comments = data.comments;

  return (
    <div>
      <PostAndButtons post={post} />
      <div className="comments">
        {comments.map((comment) => {
          return <li key={comment.id}> {comment.text} </li>;
        })}
      </div>
    </div>
  );
}
