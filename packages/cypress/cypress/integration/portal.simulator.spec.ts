/// <reference types="cypress" />

import { constants, selectors } from '@monorepo/test-base';
const {
  homePage,
  login: { emailInput, loginButton, loginLink, passwordInput },
  simulator: simulatorSelector
} = selectors;
const {
  credentials: { email, password },
  portalHome,
  simulator: simulatorConstant
} = constants;

describe('Liferay Portal', () => {
  beforeEach(() => {
    constants.preserve();
  });

  it('Open Portal', () => {
    const { helloWorldContainer, welcomeContainer } = homePage;
    cy.visit('');

    cy.get(helloWorldContainer).contains(portalHome.helloWorld);
    cy.get(welcomeContainer).contains(portalHome.welcome);
    cy.title().should('eq', portalHome.title);
    cy.get('#footer').contains(portalHome.footer);
  });

  it('SignIn', () => {
    cy.get(loginLink).click();

    cy.get(emailInput)
      .should('have.value', '@liferay.com')
      .clear()
      .type(email)
      .should('have.value', email);

    cy.get(passwordInput)
      .should('not.have.value')
      .type(password)
      .should('have.value', password);

    cy.get(loginButton).should('be.enabled').click();
  });

  it('Welcome Page (Logged user)', () => {
    cy.get(selectors.userAvatar).should('be.visible');
  });

  describe('Screen Simulations', () => {
    beforeEach(() => {
      cy.get('.product-menu.sidebar.sidebar-inverse').as('sidebar');
    });

    it('Open Screen Simulator', () => {
      cy.get('@sidebar').should('not.be.visible');

      cy.wait(100);

      cy.get(simulatorSelector.openSimulation).parent().click();

      cy.get('@sidebar').should('be.visible');
    });

    it('Check if desktop is the default', () => {
      cy.get('.default-devices button.selected').contains('Desktop');
    });

    it('Run simulator in differents viewports', () => {
      cy.get('.default-devices button')
        .should('have.length', 5)
        .each((button, index) => {
          const actualButton = constants.buttons[index];
          cy.get(button).as('button').click();
          cy.get('@button').contains(actualButton);
        });

      cy.get(simulatorSelector.height)
        .should('have.value', simulatorConstant.defaultValue)
        .clear()
        .type(simulatorConstant.height);

      cy.get(simulatorSelector.width)
        .should('have.value', simulatorConstant.defaultValue)
        .clear()
        .type(simulatorConstant.width);
    });

    it('Close Simulation Sidebar', () => {
      cy.get('@sidebar').within(() => {
        cy.get(simulatorSelector.closeSimulator).click();
      });
    });
  });
});
