// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;

    /**
     * Custom command to login on Portal.
     * @example cy.login(`test@liferay.com`, `test`)
     */
    login(email?: string, password?: string): Chainable<Element>;

    /**
     * Custom command to deal with xpaths.
     * @example cy.xpath(`//ul[@class="todo-list"]//li`)
     */
    xpath(path: string): Chainable<Element>
  }
}
