import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogPostList from './BlogPostList';
import { ToggleDetail } from './BlogPostList';
import PostForm from './PostForm';

test('renders content', async () => {
	const post = {
		title: 'test post2',
		author: 'me',
		url: 'http://localhost:3001/2',
		likes: 0,
		user: null,
		id: '63202178e7e41aafb57bb208',
	};
	const currentUser = {
		name: 'buki',
	};

	render(<BlogPostList post={post} currentUser={currentUser} />);

	const element = await screen.findByText('test post2, by me');
	expect(element).toBeDefined();
});

describe('<Togglable />', () => {
	let container;

	beforeEach(() => {
		container = render(
			<ToggleDetail label='show...'>
				<div className='testDiv'>togglable content</div>
			</ToggleDetail>
		).container;
	});

	test('renders its children', async () => {
		await screen.findAllByText('togglable content');
	});

	test('at start the children are not displayed', () => {
		const div = container.querySelector('.togglableContent');
		expect(div).toHaveStyle('display: none');
	});

	test('after clicking the button, children are displayed', async () => {
		const user = userEvent.setup();
		const button = screen.getByText('show...');
		await user.click(button);

		const div = container.querySelector('.testDiv');
		expect(div).not.toHaveStyle('display: none');
	});
});
describe('Like button pressed twice', () => {
	test('<BlogPostList /> updates parent state and calls handelLike twice', async () => {
		const likePost = jest.fn();
		const user = userEvent.setup();
		const post = {
			title: 'test post2',
			author: 'me',
			url: 'http://localhost:3001/2',
			likes: 0,
			user: null,
			id: '63202178e7e41aafb57bb208',
		};
		const currentUser = {
			name: 'buki',
		};

		render(
			<BlogPostList
				post={post}
				handelLike={likePost}
				currentUser={currentUser}
			/>
		);

		const likeButton = screen.getByText('like');
		await user.click(likeButton);
		await user.click(likeButton);

		expect(likePost.mock.calls).toHaveLength(2);
	});
});
describe('<PostForm />', () => {
	test('<PostForm /> updates parent state and calls onSubmit', async () => {
		const createPost = jest.fn();
		const user = userEvent.setup();
		render(<PostForm handleCreatePostSubmit={createPost} />);

		const inputs = screen.getAllByRole('textbox');
		await user.type(inputs[0], 'testing a form');
		await user.type(inputs[1], 'me');
		await user.type(inputs[2], 'http://someurl.com/1');
		const submitBtn = screen.getByText('Create Post');

		await user.click(submitBtn);

		expect(createPost.mock.calls).toHaveLength(1);
	});
});
