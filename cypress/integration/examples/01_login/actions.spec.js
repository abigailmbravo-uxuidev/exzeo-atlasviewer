/// <reference types="cypress" />
import 'cypress-file-upload';

// Login to the App
describe('LogIn to the app', () => {
  it('Login to the app', () => {
    cy.visit('/');
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.getCookies().then(coockies => {
      cy.log(coockies);
    });
    cy.get('button').click();
    cy.clearLocalStorage();
    cy.clearCookies();
    // cy.get('[name="username"]').type('ashatunov@exzeo.com');
    // cy.get('[name="password"]').type('Vega1407!');
    // cy.get('button').click();
  });

  //Upload the file , verify modals
  it('Upload the file', () => {
    const fileName = 'TestFile.csv';
    cy.get('.card').should('not.exist');
    cy.get('button')
      .contains('Upload')
      .first()
      .click();
    cy.get('.card').should('exist');
    cy.fixture(fileName).then(fileContent => {
      cy.get('#feed').upload({
        fileContent,
        fileName,
        mimeType: 'text/csv'
      });
    });
    cy.get('#feed-name')
      .clear()
      .type('test-text');
    cy.get('button[type = "submit"]').click();
    cy.get('[class*="spinner"]').should('not.exist');
    cy.get('.card').should('not.exist');
    cy.get('.file-name')
      .last()
      .should('have.text', 'test-text');
  });
});
