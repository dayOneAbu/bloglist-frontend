/* eslint-disable no-undef */

describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		// create new user
		const newUser = {
			userName: 'meme',
			name: 'test user',
			password: '12345',
		};
		cy.request('POST', 'http://localhost:3003/api/users/', newUser);
		cy.visit('http://localhost:3000');
	});

	it('Login form is shown', function () {
		it('Login form is shown', function () {
			cy.contains('log into the application');
		});
	});

	describe('User Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click();
			cy.get('#username').type('meme');
			cy.get('#password').type('12345');
			cy.get('#login-btn').click();

			cy.contains('meme is loggedIn');
		});

		it('fails with wrong credentials', function () {
			cy.contains('login').click();
			cy.get('#username').type('meme');
			cy.get('#password').type('12345');
			cy.get('#login-btn').click();

			cy.contains('someOne is loggedIn');
		});
	});
	describe('Logged User can ', function () {
		beforeEach(function () {
			// cy.login({ userName: 'meme', password: '12345' });
			cy.get('#username').type('meme');
			cy.get('#password').type('12345');
			cy.get('#login-btn').click();
		});
		it('create Post', function () {
			cy.contains('Add Post').click();
			cy.get('#title').type('test post from cypress e2e test');
			cy.get('#author').type('buki');
			cy.get('#url').type('http://localhost:3003/1');
			cy.get('#submit-btn').click();
			cy.contains('test post from cypress e2e test');
		});
		it('Like Post', function () {
			cy.contains('Add Post').click();
			cy.get('#title').type('test post from cypress e2e test');
			cy.get('#author').type('buki');
			cy.get('#url').type('http://localhost:3003/1');
			cy.get('#submit-btn').click();
			cy.contains('test post from cypress e2e test, by buki')
				.contains('view')
				.click();
			cy.get('#like-btn').click();
			cy.contains('1');
		});
		it('Delete Post', function () {
			cy.contains('Add Post').click();
			cy.get('#title').type('test post from cypress e2e test');
			cy.get('#author').type('buki');
			cy.get('#url').type('http://localhost:3003/1');
			cy.get('#submit-btn').click();
			cy.contains('test post from cypress e2e test, by buki')
				.contains('view')
				.click();
			cy.contains('Delete Post');
			cy.get('#delete-btn').click();
		});
		it('Like Post many', function () {
			cy.contains('Add Post').click();
			cy.get('#title').type('The title with the second most likes');
			cy.get('#author').type('buki');
			cy.get('#url').type('http://localhost:3003/1');
			cy.get('#submit-btn').click();
			cy.contains('The title with the second most likes, by buki')
				.contains('view')
				.click();

			cy.get('#like-btn').click();
			cy.get('#like-btn').click();
			cy.get('#like-btn').click();
			cy.contains('The title with the second most likes, by buki')
				.contains('hide')
				.click();
			cy.get('#title').type('The title with the most likes');
			cy.get('#author').type('buki');
			cy.get('#url').type('http://localhost:3003/1');
			cy.get('#submit-btn').click();

			cy.get('.blogPost')
				.eq(0)
				.should('contain', 'The title with the most likes');
			cy.get('.blogPost')
				.eq(1)
				.should('contain', 'The title with the second most likes');
		});
	});
});
