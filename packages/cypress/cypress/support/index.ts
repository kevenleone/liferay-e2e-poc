// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-xpath';

import Portal from '../integration/portal';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('login', (username, password) => {
  const portal = new Portal();
  portal.signIn(username, password);
});

Cypress.on('window:before:load', win => {
  fetch('https://unpkg.com/unfetch/dist/unfetch.umd.js')
    .then(stream => stream.text())
    .then(response => {
      win.eval(response);
      win.fetch = win.unfetch;
    });
});
