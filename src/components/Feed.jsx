import { API_URL } from "@/lib/API_URL.js";
import PostsAndComments from "./PostsAndComments.jsx";

export default async function Feed() {
  const res = await fetch(`${API_URL}/api/posts`, { cache: "no-store" });
  const data = await res.json();
  const feed = data.posts;

  //   console.log(feed);

  return (
    <div>
      {feed.map((post) => {
        return <PostsAndComments key={post.id} post={post} />;
      })}
    </div>
  );
}
