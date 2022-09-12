import BlogPostList from './BlogPostList';
import PropTypes from 'prop-types';
function BlogPost({ blogPosts, LikeHandler, currentUser, deleteHandler }) {
	return (
		<div>
			<h2>blogs</h2>
			{blogPosts &&
				blogPosts
					.sort((a, b) => a.likes - b.likes)
					.map((post) => (
						<BlogPostList
							currentUser={currentUser}
							handelLike={LikeHandler}
							handelDelete={deleteHandler}
							key={post.id}
							post={post}
						/>
					))}
		</div>
	);
}
BlogPost.propTypes = {
	blogPosts: PropTypes.array.isRequired,
	LikeHandler: PropTypes.func.isRequired,
	currentUser: PropTypes.object.isRequired,
	deleteHandler: PropTypes.func.isRequired,
};
export default BlogPost;
