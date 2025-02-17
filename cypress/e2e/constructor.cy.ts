/// <reference types="cypress" />

describe('Burger constructor tests: ', () => {
	function emulateDnD() {
		const sections = ['bun', 'sauce', 'main'];

		sections.forEach((section) => {
			cy.get(`[data-section="${section}"] div a`).then(($items) => {
				if ($items.length > 0) {
					const randomIndex = Math.floor(Math.random() * $items.length);
					const randomItem = $items[randomIndex];

					const dataTransfer = new DataTransfer();

					cy.wrap(randomItem).trigger('dragstart', { dataTransfer });

					cy.get('[data-testid="dropzone"]').trigger('drop', {
						dataTransfer,
					});
				}
			});
		});
		return;
	}

	beforeEach(() => {
		cy.intercept(
			'GET',
			'https://norma.nomoreparties.space/api/ingredients?',
		).as('getIngredients');
		cy.visit('/');
		cy.wait('@getIngredients');
		cy.get('[data-section="bun"]').should('be.visible');
	});

	it('1 - перенос продуктов успешен', () => {
		emulateDnD();
	});

	it('2 - перенос неавторизованного на страницу логина', () => {
		emulateDnD();

		cy.get("[data-type='submitButton'] > button").click();
		cy.url().should('eq', 'http://localhost:8000/login');
	});

	it('3 - успешный заказа авторизованного пользователя', () => {
		cy.intercept('POST', '/api/auth/login').as('login');
		cy.intercept('POST', '/api/orders').as('orders');

    cy.visit('/login')
		
		cy.get('input[name="email"]').type('dodos@test.ru');
		cy.get('input[name="password"]').type('Qwerty123{enter}');
		cy.wait('@login').then((interception) => {
			const { accessToken, refreshToken } = interception.response!.body;

			cy.setCookie('accessToken', accessToken);
			cy.setCookie('refreshToken', refreshToken);
		});

		emulateDnD();

		cy.get("[data-type='submitButton'] > button").click();
		cy.wait('@orders')
			.its('response.statusCode')
			.should('eq', 200);
	});
});
