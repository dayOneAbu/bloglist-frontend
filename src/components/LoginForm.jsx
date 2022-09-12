import { useState } from 'react';
import { getLoggedUser, LogUserIn } from '../services/blogService';
import { setStorageItem } from '../utils/storageHelpers';

function LoginForm({ createMessageType, setUser }) {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
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
			createMessageType(err.response.data.error, 'error');
		}
	};
	return (
		<div>
			<h2>log into the application</h2>

			<form onSubmit={handleLoginSubmit}>
				<div>
					<label htmlFor='userName'>
						userName {''}
						<input
							name='userName'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='password'>
						Password {''}
						<input
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	);
}
export default LoginForm;
