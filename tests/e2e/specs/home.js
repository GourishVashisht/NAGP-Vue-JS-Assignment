// https://docs.cypress.io/api/introduction/api.html

describe('My Home page e2e Tests', () => {

  it('should visit the app root url and validate title', () => {
    cy.visit('/')
    cy.title().should('eq', 'nagp-vue-js-assignment');
  })

  it('should validate all HTML elements for the home page', () => {
    cy.contains('h1', 'conduit')
    cy.contains('p', 'A place to share your knowledge.')
  });

  it('should validate all navbar elements', () => {
    cy.get('#home-navlink').contains('Home');
    cy.get('#login-navlink').contains('Sign In');
    cy.get('#register-navlink').contains('Sign Up');
  });

  it('should validate all footer elements', () => {
    cy.get('#footer-name').contains('NAGP Assignment 2019');
    cy.get('#developer-name').contains('By Gourish Vashisht');
  });

})
