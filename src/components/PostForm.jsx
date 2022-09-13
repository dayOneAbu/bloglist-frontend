import { useState } from 'react';
import PropTypes from 'prop-types';
function PostForm({ handleCreatePostSubmit }) {
	const [post, setPost] = useState({
		title: '',
		author: '',
		url: '',
	});

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
							placeholder='write here post title'
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
	handleCreatePostSubmit: PropTypes.func.isRequired,
};
export default PostForm;
