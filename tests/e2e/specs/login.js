// https://docs.cypress.io/api/introduction/api.html

describe('My Login Page e2e Tests', () => {

    it('should route to login page, when sign in navbar link is clicked from home page',
        () => {
            cy.visit('/');
            cy.get('#login-navlink').click();
            cy.url().should('include', '/login');
        });

    it('should validate all HTML elements of login page',
        () => {
            cy.contains('h1', 'Sign In');
            cy.contains('p', 'Need an account?');
            cy.contains('button', 'Sign in');
        });

    it('should route to register page when "Need an account?" is clicked from login page',
        () => {
            cy.get('p').click();
            cy.url().should('include', '/register');
        });

    it('should visit login page when "Have an account?" is clicked from register page',
        () => {
            cy.get('p').click();
            cy.url().should('include', '/login');
        });

    it('should validate all login form elements to be empty on page load',
        () => {
            cy.get('input[type="text"]').should('have.value', '');
            cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Email');
            cy.get('input[type="password"]').should('have.value', '');
            cy.get('input[type="password"]').should('have.attr', 'placeholder', 'Password');
        });

    it('should display error messages when both email & password are empty and "Sign in" button is clicked',
        () => {
            cy.get('#sign-in-button').click();
            cy.get('#email-error').should('have.text', 'Email is invalid');
            cy.get('#password-error').should('have.text', 'Password is invalid');
        });

    it('should display error message for email, when password is filled,'
        + ' email is empty and "Sign in" button is clicked',
        () => {
            cy.get('input[type="password"]').type('password_123');
            cy.get('#sign-in-button').click();
            cy.get('#email-error').should('have.text', 'Email is invalid');
            cy.get('#password-error').should('have.text', '');
            cy.get('input[type="password"]').clear();
        });

    it('should display error message for password, when email is filled,'
        + ' password is empty and "Sign in" button is clicked',
        () => {
            cy.get('input[type="text"]').type('gourish@gmail.com');
            cy.get('#sign-in-button').click();
            cy.get('#email-error').should('have.text', '');
            cy.get('#password-error').should('have.text', 'Password is invalid');
            cy.get('input[type="text"]').clear();
        });

    it('should display generic error message for email & password, when both are filled'
        + 'and "Sign in" button is clicked',
        () => {
            cy.get('input[type="text"]').type('kiddan@gmail.com');
            cy.get('input[type="password"]').type('kiddan');
            cy.get('#sign-in-button').click();
            cy.get('#email-error').should('have.text', '');
            cy.get('#password-error').should('have.text', '');
            cy.get('#generic-error').should('have.text', 'Either email or password is invalid');
            cy.get('input[type="text"]').clear();
            cy.get('input[type="password"]').clear();
        });

    it('should login user when both email & password are filled and valid'
        + 'and "Sign in" button is clicked',
        () => {
            cy.get('input[type="text"]').type('kiddan@gmail.com');
            cy.get('input[type="password"]').type('kiddan123');
            cy.get('#sign-in-button').click();
            cy.url().should('include', '/');
            cy.contains('h1', 'conduit')
            cy.contains('p', 'A place to share your knowledge.')
        });

    it('should validate all navbar elements after successfull login',
        () => {
            cy.get('#home-navlink').contains('Home');
            cy.get('#editor-navlink').contains('New Article');
            cy.get('#settings-navlink').contains('Settings');
        });
});
