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
  portalURL,
  simulator: simulatorConstant
} = constants;

describe.skip('Open Liferay', () => {
  beforeEach(() => {
    constants.preserve();
  });

  it('Abrir o Liferay Portal', () => {
    const { helloWorldContainer, welcomeContainer } = homePage;
    cy.visit(portalURL);

    cy.get(helloWorldContainer).contains(portalHome.helloWorld);
    cy.get(welcomeContainer).contains(portalHome.welcome);
    cy.title().should('eq', portalHome.title);
    cy.get('#footer').contains(portalHome.footer);
  });

  it('Fazer Login', () => {
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

  it('Página de Bem Vindo (Usuário Logado)', () => {
    cy.get(selectors.userAvatar).should('be.visible');
  });

  describe('Simulações de tela', () => {
    beforeEach(() => {
      cy.get('.product-menu.sidebar.sidebar-inverse').as('sidebar');
    });

    it('Abrir simulador de telas', () => {
      cy.get('@sidebar').should('not.be.visible');

      cy.wait(100);

      cy.get(simulatorSelector.openSimulation).parent().click();

      cy.get('@sidebar').should('be.visible');
    });

    it('Verificar se o item padrão é Desktop', () => {
      cy.get('.default-devices button.selected').contains('Desktop');
    });

    it('Executar a simulação em diversos viewports', () => {
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

    it('Fechar Sidebar de Simulação', () => {
      cy.get('@sidebar').within(() => {
        cy.get(simulatorSelector.closeSimulator).click();
      });
    });
  });
});
