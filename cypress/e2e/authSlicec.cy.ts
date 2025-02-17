/// <reference types="cypress" />

const PAGE_URLS = {
	main: '/',
	profile: '/profile',
	orders: '/profile/orders',
	ordersId: '/profile/orders/:id',
	login: '/login',
	ingredients: '/ingredients',
	ingredientsId: '/ingredients/:id',
	feed: '/feed',
	feedId: '/feed/:id',
	register: '/register',
	forgotPassword: '/forgot-password',
	resetPassword: '/reset-password',
};

describe('Auth Slice Tests', () => {
	const randomPrefix = Math.random() + Math.random() + Math.random();
	beforeEach(() => {
		cy.intercept('POST', '/api/auth/login').as('login');
		cy.intercept('POST', '/api/auth/register').as('register');
		cy.intercept('POST', '/api/auth/forgot-password').as('forgotPassword');
		cy.intercept('POST', '/api/auth/reset-password').as('resetPassword');
		cy.intercept('PATCH', '/api/auth/user').as('updateUser');
		cy.intercept('POST', '/api/auth/logout').as('logout');
	});

	it('should register successfully', () => {
		cy.visit(PAGE_URLS.register);
		cy.get('input[name="name"]').type('Dima');
		cy.get('input[name="email"]').type(randomPrefix + 'newuser@example.com');
		cy.get('input[name="password"]').type('password123{enter}');
		cy.wait('@register');
		cy.url().should('eq', 'http://localhost:8000/');
	});

	it('should login successfully', () => {
		cy.visit(PAGE_URLS.login);
		cy.get('input[name="email"]').type(randomPrefix + 'newuser@example.com');
		cy.get('input[name="password"]').type('password123{enter}');
		cy.wait('@login');
		cy.url().should('eq', 'http://localhost:8000/');
	});

	it('should update user details', () => {
		cy.visit(PAGE_URLS.login);

		cy.get('input[name="email"]').type(randomPrefix + 'newuser@example.com');
		cy.get('input[name="password"]').type('password123{enter}');

		cy.wait('@login').then((interception) => {
			const { accessToken, refreshToken, user } = interception.response!.body;

			cy.setCookie('accessToken', accessToken);
			cy.setCookie('refreshToken', refreshToken);
			cy.window().then((win) => {
				win.localStorage.setItem('user', JSON.stringify(user));
			});
		});

		cy.visit(PAGE_URLS.profile);
		cy.url().should('eq', 'http://localhost:8000' + PAGE_URLS.profile);
		cy.get('input[name="name"]').type('Dima1{enter}');
	});
});
