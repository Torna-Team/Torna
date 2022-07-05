describe('Login, logout and register', () => {
	// it('Google Sign in', () => {
	// 	cy.visit('https://thesis-project-jet.vercel.app/');
	// 	cy.get('.googleBtn').click();
	// 	cy.get('.backgroundContainer').click();
	// });

	it('Register', () => {
		cy.visit('https://thesis-project-jet.vercel.app/');
		cy.get('a').click();
		cy.get('[name="firstName"]').type('Testing');
		cy.get('[name="lastName"]').type('E2E');
		cy.get('[name="password"]').type('test123');
		cy.get('[name="confirmPassword"]').type('test123');
		cy.get('[type="email"]').type('testinge2e@gmail.com');
		cy.get('.registerBtn').click();
	});

	it('Login', () => {
		cy.visit('https://thesis-project-jet.vercel.app/');
		cy.get('[type="text"]').type('testinge2e@gmail.com');
		cy.get('[type="password"]').type('test123');
		cy.get('.signInBtn').click();
	});

	it('Logout', () => {
		cy.visit('https://thesis-project-jet.vercel.app/');
		cy.get('[type="text"]').type('testinge2e@gmail.com');
		cy.get('[type="password"]').type('test123');
		cy.get('.signInBtn').click();
		cy.wait(1000);
		cy.get('.logOutBtn').click();
	});
});

describe('main features', () => {
	it('get profile and create a new album', () => {
		cy.visit('https://thesis-project-jet.vercel.app/');
		cy.get('[type="text"]').type('testinge2e@gmail.com');
		cy.get('[type="password"]').type('test123');
		cy.get('.signInBtn').click();
		cy.wait(1000);
		cy.get('.newAlbumButton').click();
	});

	it('background and grid', () => {
		cy.get('[value="backgroundTool"]').click();
		cy.get('[title="#FCDC00"]').click();
		cy.get('.check > input').click();
		cy.wait(1000);
		cy.get('[value="backgroundTool"]').click();
	});

	it('shapes', () => {
		cy.get('[value="star"]').click();
		cy.get('[value="circle"]').click();
		cy.get('[value="line"]').click();
		cy.get('[value="arrow"]').click();
	});

	it('text, sticker', () => {
		cy.get('[value="textTool"]').click();
		cy.get('#text').type('Hello, I am a Test');
		cy.get('.buttonFont').click();
		cy.get('[value="animatedTextTool"]').click();
		cy.get('.search-gif > form > input').type('test');
		cy.get('.search-gif > form > button').click();
		cy.get(
			'[src="https://media0.giphy.com/media/qyyGWfJGQYm8I6GBwG/200_d.gif?cid=3a3f54879ic3evuzt85rk5jq6rh64g4xs5lu8lr0gbbsm6z8&rid=200_d.gif&ct=s"]'
		).click();
		cy.wait(2000);
	});

	// it.only('gif', () => {
	// 	cy.get('[value="gifTool"]').click();
	// 	cy.get('.search-gif > form > input').type('test');
	// 	cy.get('.search-gif > form > button').click();
	// 	cy.get(
	// 		'[src="https://media0.giphy.com/media/gw3IWyGkC0rsazTi/200_d.gif?cid=3a3f5487wpmu32pif39zex25k08w5iwi8bpok6jtmsiqgkna&rid=200_d.gif&ct=g"]'
	// 	).click();
	// });
});

describe('functionality', () => {
	it('write title, save', () => {
		cy.visit('https://thesis-project-jet.vercel.app/');
		cy.get('[type="text"]').type('testinge2e@gmail.com');
		cy.get('[type="password"]').type('test123');
		cy.get('.signInBtn').click();
		cy.get('.newAlbumButton').click();
		cy.get('.navbarInput').type('Test123');
		cy.get('.buttonSave').click();
		cy.get('.navbarLogo').click();
		cy.get('.albumFrontImage').trigger('mouseover');
		cy.wait(2000);
	});
});
