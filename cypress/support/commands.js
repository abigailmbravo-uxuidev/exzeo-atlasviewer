import 'cypress-file-upload';
import 'cypress-plugin-snapshots/commands';
import { usersData } from '../fixtures/data'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
//   cy.get(selector).then(subject => {
//     cy.fixture(fileName, 'base64')
//       .then(Cypress.Blob.base64StringToBlob)
//       .then(blob => {
//         const el = subject[0];
//         const testFile = new File([blob], fileName, { type: fileType });
//         const dataTransfer = new DataTransfer();
//         dataTransfer.items.add(testFile);
//         el.files = dataTransfer.files;
//       });
//   });
// });

Cypress.Commands.add('loginToApplication', (user) => {
  cy.visit('/');
  cy.get('button').click();
  cy.url().then( url => {
    if (url.includes('atlas-viewer.auth0.com')){
      cy.get('[name="username"]').type(usersData[user].login);
      cy.get('[name="password"]').type(usersData[user].password);
      cy.get('button').click();
      cy.wait('@getUserData').then(response => {        
        expect(response.status).to.equal(200)
      })
      cy.wait(2000)      
      cy.reload()
    } else {
      cy.logoutFromApplication();
      cy.loginToApplication(user)
    }
  })

  
});

Cypress.Commands.add('logoutFromApplication', () => {
  cy.get('.logoutBtn').click();
  cy.url().should('eq', 'https://www-stage.atlasviewer.com/');
});

Cypress.on('window:before:load', win => {
  delete win.fetch;
});
