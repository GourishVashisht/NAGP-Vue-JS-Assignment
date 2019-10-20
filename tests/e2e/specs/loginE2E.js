describe('My Login Page e2e Test', () => {

    it('should visit login page when sign in clicked from home page', () => {
        cy.visit('/');
        cy.get('#login-link').click();
        cy.url().should('include', '/login');
    });

    it('should validate al HTML elements of the page', () => {
        cy.contains('h1', 'Sign In')
        cy.contains('p', 'Need an account?');
        cy.contains('button', 'Sign in');
    });

    it('should visit register page when "Need an account?" is clicked from login page', () => {
        cy.get('p').click();
        cy.url().should('include', '/register');
    });

    it('should visit login page when "Have an account?" is clicked from register page', () => {
        cy.get('p').click();
        cy.url().should('include', '/login');
    });

    it('should validate for form elements to be empty on page load', () => {
        cy.get('input[type="text"]').should('have.value', '');
        cy.get('input[type="password"]').should('have.value', '');
        cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Email');
        cy.get('input[type="password"]').should('have.attr', 'placeholder', 'Password');
    });

    it('should display error messages when both email & password are empty'
        + 'and "Sign in" button is clicked', () => {
            cy.get('#sign-in-button').click();
            cy.get('#email-error').should('have.text', 'Email is invalid');
            cy.get('#password-error').should('have.text', 'Password is invalid');
        });

    it('should display error message for email, when password is filled,'
        + 'email is empty and "Sign in" button is clicked', () => {
            cy.get('input[type="password"]').type('password_123');
            cy.get('#sign-in-button').click();
            cy.get('#email-error').should('have.text', 'Email is invalid');
            cy.get('#password-error').should('have.text', '');
            cy.get('input[type="password"]').clear();
        });

    it('should display error message for password, when email is filled,'
        + 'password is empty and "Sign in" button is clicked', () => {
            cy.get('input[type="text"]').type('gourish@gmail.com');
            cy.get('#sign-in-button').click();
            cy.get('#email-error').should('have.text', '');
            cy.get('#password-error').should('have.text', 'Password is invalid');
            cy.get('input[type="text"]').clear();
        });

    it('should display generic error message for email & password, when both are filled'
        + 'and "Sign in" button is clicked', () => {
            cy.get('input[type="text"]').type('kiddan@gmail.com');
            cy.get('input[type="password"]').type('kiddan');
            cy.get('#sign-in-button').click();
            cy.get('#email-error').should('have.text', '');
            cy.get('#password-error').should('have.text', '');
            cy.get('#generic-error').should('have.text', 'Either email or password is invalid');
        });

    it('should login user when both email & password are filled and valid'
        + 'and "Sign in" button is clicked', () => {
            cy.get('input[type="text"]').clear();
            cy.get('input[type="password"]').clear();
            cy.get('input[type="text"]').type('kiddan@gmail.com');
            cy.get('input[type="password"]').type('kiddan123');
            cy.get('#sign-in-button').click();
            cy.url().should('include', '/');
        });

});
