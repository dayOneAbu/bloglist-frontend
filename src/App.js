import { useEffect, useState } from 'react';
import BlogPost from './components/BlogPost';
import LoginForm from './components/LoginForm';
import NotificationMessage from './components/NotificationMessage';
import PostForm from './components/PostForm';
import {
	addNewPost,
	getAll,
	getLoggedUser,
	LogUserIn,
	LogUserOut,
} from './services/blogService';
import { getStorageItem, setStorageItem } from './utils/storageHelpers';

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
	const handleLoginSubmit = async (e) => {
		try {
			e.preventDefault();
			const { userName, password } = e.target;
			const token = await LogUserIn({
				userName: userName.value,
				password: password.value,
			});
			setStorageItem('loggedUserToken', token);
			const data = await getLoggedUser();
			setStorageItem('loggedUser', data);
			setUser(data);
		} catch (err) {
			createMessageType(err.response.data.error,'error');
		}
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
			createMessageType(err.response.data.error,'error');
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
					{/* <PostForm onsubmit={()=>console.log("hello")} /> */}
					<PostForm onsubmit={handleCreatePostSubmit} />
					<BlogPost blogPosts={blogs} />
				</>
			) : (
				<LoginForm onsubmitHandler={handleLoginSubmit} />
			)}
		</div>
	);
}

export default App;
