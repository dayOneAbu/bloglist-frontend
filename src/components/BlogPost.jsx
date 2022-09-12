import BlogPostList from "./BlogPostList";

function BlogPost({ blogPosts }) {
  return (
    <div>
      <h2>blogs</h2>
      {blogPosts &&
        blogPosts.map((post) => <BlogPostList key={post.id} post={post} />)}
    </div>
  );
}
export default BlogPost;
