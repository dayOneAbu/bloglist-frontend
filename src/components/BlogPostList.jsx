function BlogPostList({ post }) {
  return (
    <>
      {post && (
        <p>
          {post.title} {post.author}
        </p>
      )}
    </>
  );
}
export default BlogPostList;
