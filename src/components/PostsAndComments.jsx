import { API_URL } from "@/lib/API_URL.js";

export default async function PostsAndComments({ post }) {
  const res = await fetch(`${API_URL}/api/posts/${post.id}/comments`);
  const data = await res.json();
  const comments = data.comments;

  return (
    <div>
      <div className="text">
        <h3> {post.text} </h3>
      </div>
      <div className="buttons">
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div>
      <div className="comments">
        <ul>
          {comments.map((comment) => {
            return <li key={comment.id}> {comment.text} </li>;
          })}
        </ul>
      </div>
    </div>
  );
}
