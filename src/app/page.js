import Feed from "@/components/Feed.jsx";
import NewPost from "@/components/NewPost.jsx";

export default function Home() {
  return (
    <main>
      <h1>Spammer</h1>
      <NewPost />
      <Feed />
    </main>
  );
}
