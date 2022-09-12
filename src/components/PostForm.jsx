import { useState } from 'react';
import { addNewPost } from '../services/blogService';
import PropTypes from 'prop-types';
function PostForm({ createMessageType, setBlogs }) {
	const [post, setPost] = useState({
		title: '',
		author: '',
		url: '',
	});
	const handleCreatePostSubmit = async (e) => {
		try {
			e.preventDefault();
			const { title, author, url } = e.target;
			const post = await addNewPost({
				title: title.value,
				author: author.value,
				url: url.value,
			});
			setBlogs((prev) => {
				return [...prev, post];
			});
		} catch (err) {
			createMessageType(err.response.data.error, 'error');
		}
	};
	return (
		<div>
			<h2>Create New Post</h2>
			<form onSubmit={handleCreatePostSubmit}>
				<div>
					<label htmlFor='title'>
						title {''}{' '}
						<input
							name='title'
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
					<label htmlFor='author'>
						author {''}
						<input
							name='author'
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
					<label htmlFor='url'>url</label>
					<input
						name='url'
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
				</div>
				<button type='submit'>Create Post</button>
			</form>
		</div>
	);
}
PostForm.propTypes = {
	setBlogs: PropTypes.func.isRequired,
	createMessageType: PropTypes.func.isRequired,
};
export default PostForm;
