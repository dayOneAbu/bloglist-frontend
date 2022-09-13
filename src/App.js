/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import BlogPost from './components/BlogPost';
import LoginForm from './components/LoginForm';
import NotificationMessage from './components/NotificationMessage';
import PostForm from './components/PostForm';
import Togglable from './components/Togglable';
import {
	addLike,
	addNewPost,
	deletePost,
	getAll,
	LogUserOut,
} from './services/blogService';
import { getStorageItem } from './utils/storageHelpers';

function App() {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState({
		text: null,
		type: '',
	});

	const fetchData = async () => {
		const blogs = await getAll();
		setBlogs(blogs);
	};
	useEffect(() => {
		const data = getStorageItem('loggedUser');
		setUser(data);
	}, []);
	useEffect(() => {
		fetchData();
	}, []);
	const createMessageType = (text, type) => {
		setMessage({
			text,
			type,
		});
		setTimeout(() => {
			setMessage({
				text: null,
				type: '',
			});
		}, 5000);
	};
	const handelLike = async (id, data) => {
		const post = await addLike(id, data);
		setBlogs((prev) => {
			const idx = prev.findIndex((obj) => obj.id === post.id);
			prev[idx] = post;
			return [...prev];
		});
	};
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
	const handelDelete = async (id) => {
		if (window.confirm('Do you really want to Remove this post?')) {
			await deletePost(id);
			setBlogs((prev) => {
				prev = prev.filter((obj) => obj.id !== id);
				return [...prev];
			});
		}
	};
	return (
		<div className='App'>
			<NotificationMessage message={message} />
			{user ? (
				<>
					<h3>{user.userName} is loggedIn </h3>
					<button
						onClick={() => {
							LogUserOut();
							setUser(null);
						}}
					>
						logout
					</button>
					<Togglable buttonLabel='Add Post'>
						<PostForm
							createMessageType={createMessageType}
							setBlogs={setBlogs}
						/>
					</Togglable>
					<BlogPost
						currentUser={user}
						LikeHandler={handelLike}
						deleteHandler={handelDelete}
						blogPosts={blogs}
					/>
				</>
			) : (
				<LoginForm handleCreatePostSubmit={handleCreatePostSubmit} />
			)}
		</div>
	);
}
export default App;
