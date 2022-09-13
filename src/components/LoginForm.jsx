import { useState } from 'react';

function LoginForm({ handleLoginSubmit }) {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div>
			<h2>log into the application</h2>

			<form onSubmit={handleLoginSubmit}>
				<div>
					<label htmlFor='userName'>
						userName {''}
						<input
							id='username'
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
							id='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
				</div>
				<button id='login-btn' type='submit'>
					login
				</button>
			</form>
		</div>
	);
}
export default LoginForm;
