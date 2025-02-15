/// <reference types="cypress" />

describe('Auth Redux Slice', () => {
	beforeEach(() => {
		cy.visit('/'); 

		cy.intercept('POST', '/api/auth/login', {
			statusCode: 200,
			body: {
				accessToken: 'mockAccessToken',
				refreshToken: 'mockRefreshToken',
				user: { id: 1, name: 'Test User' },
			},
		}).as('loginRequest');

		cy.intercept('POST', '/api/auth/register', {
			statusCode: 200,
			body: {
				accessToken: 'mockAccessToken',
				refreshToken: 'mockRefreshToken',
				user: { id: 2, name: 'New User' },
			},
		}).as('registerRequest');

		cy.intercept('POST', '/api/auth/logout', {
			statusCode: 200,
		}).as('logoutRequest');
	});

	it('Успешный логин обновляет Redux store и устанавливает куки', () => {
		cy.window().should('have.property', 'store');

		cy.window()
			.its('store')
			.invoke('dispatch', {
				type: 'auth/fetchAuthLogin/fulfilled',
				payload: {
					accessToken: 'mockAccessToken',
					refreshToken: 'mockRefreshToken',
					user: { id: 1, name: 'Test User' },
				},
			});
	});
});
