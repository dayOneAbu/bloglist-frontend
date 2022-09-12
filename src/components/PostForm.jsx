import { useState } from "react";
function PostForm({ onsubmit }) {
  const [post, setPost] = useState({
    title: "",
    author: "",
    url: "",
  });
  return (
    <div>
      <h2>log into the application</h2>
      <form onSubmit={onsubmit}>
        <div>
          <label htmlFor="title">
            title {""}
            <input
              name="title"
              value={post.title}
              onChange={(e) =>
                setPost((prev) => {
                  return {
                    ...prev,
                    title: e.target.value,
                  };
                })
              }
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            author {""}
            <input
              name="author"
              value={post.author}
              onChange={(e) =>
                setPost((prev) => {
                  return {
                    ...prev,
                    author: e.target.value,
                  };
                })
              }
            />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            url {""}
            <input
              name="url"
              value={post.url}
              onChange={(e) =>
                setPost((prev) => {
                  return {
                    ...prev,
                    url: e.target.value,
                  };
                })
              }
            />
          </label>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
export default PostForm;
