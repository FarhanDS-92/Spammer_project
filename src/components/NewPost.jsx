"use client";

import { API_URL } from "@/lib/API_URL.js";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function NewPost() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.error);
    } else {
      setText("");
      setError("");
      router.refresh();
    }
  }

  return (
    <div id="addPost">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Add A Post</button>
        <p>{error}</p>
      </form>
    </div>
  );
}
