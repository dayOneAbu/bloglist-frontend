import { useState } from 'react';
export function ToggleDetail({ visible, children, onClick, label }) {
	return (
		<span>
			<button onClick={onClick}>{label}</button>
			<div
				className='togglableContent'
				style={{ display: visible ? '' : 'none' }}
			>
				{children}
			</div>
		</span>
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
		<div className='blogPost' style={blogStyle}>
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
						<button id='like-btn' onClick={() => handelLike(post.id, post)}>
							like
						</button>
					</p>
					<p>{post.user?.name}</p>
					{post.user?.name === currentUser.name && (
						<button id='delete-btn' onClick={() => handelDelete(post.id)}>
							Delete Post
						</button>
					)}
				</ToggleDetail>
			</span>
		</div>
	);
}

export default BlogPostList;
