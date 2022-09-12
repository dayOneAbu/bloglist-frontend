import { useState } from 'react';
function ToggleDetail({ visible, children, onClick, label }) {
	return (
		<>
			<button onClick={onClick}>{label}</button>
			<div style={{ display: visible ? '' : 'none' }}>{children}</div>
		</>
	);
}
function BlogPostList({ post, handelLike, currentUser, handelDelete }) {
	const [visible, setVisible] = useState(false);
	const toggleVisibility = () => {
		setVisible(!visible);
	};
	const blogStyle = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};
	return (
		<div style={blogStyle}>
			{post.title}, by {post.author}{' '}
			<span>
				<ToggleDetail
					visible={visible}
					onClick={toggleVisibility}
					label={visible ? 'hide' : 'view'}
				>
					<p>{post.url}</p>
					<p>
						{post.likes}{' '}
						<button onClick={() => handelLike(post.id, post)}>like</button>
					</p>
					<p>{post.user?.name}</p>
					{post.user?.name === currentUser.name && (
						<button onClick={() => handelDelete(post.id)}>Delete Post</button>
					)}
				</ToggleDetail>
			</span>
		</div>
	);
}

export default BlogPostList;
