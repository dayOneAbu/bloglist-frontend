// Cypress.Commands.add('login', ({ userName, password }) => {
// 	cy.request('POST', 'http://localhost:3003/api/login/', {
// 		userName,
// 		password,
// 	}).then(({ body }) => {
// 		localStorage.setItem('loggedUserToken', JSON.stringify(body));
// 		cy.request({
// 			method: 'GET',
// 			url: 'http://localhost:3003/api/users/me',
// 			headers: { Authorization: `bearer ${body}` },
// 		}).then(({ body }) => {
// 			localStorage.setItem('loggedUser', JSON.stringify(body));
// 			cy.visit('http://localhost:3000');
// 		});
// 	});
// });
