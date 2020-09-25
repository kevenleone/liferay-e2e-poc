/// <reference types="cypress" />

const { constants, selectors } = require('@monorepo/test-base')
const { homePage, login: { emailInput, loginButton, loginLink, passwordInput } } = selectors
const { credentials: { email, password }, modules, portalURL } = constants

const viewPorts = [
  'macbook-15',
  'macbook-13',
  'macbook-11',
  'ipad-2',
  'iphone-xr'
]

describe('Open Liferay', () => {
  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: [
        'JSESSIONID',
        'LFR_SESSION_STATE_20126',
        'SCREEN_NAME',
        'COMPANY_ID',
        'GUEST_LANGUAGE_ID',
        'LFR_SESSION_STATE_20103',
        'COOKIE_SUPPORT'
      ]
    })

    cy.wait(500)
  })

  it('Abrir o Liferay Portal', () => {
    const { helloWorldContainer, welcomeContainer } = homePage
    cy.visit(portalURL)
    cy.get(helloWorldContainer).contains('Hello World')
    cy.get(welcomeContainer).contains('Welcome to Liferay Community')
    cy.title().should('eq', 'Home - Liferay')
    cy.get('#footer').contains('By Liferay')
  })

  it('Fazer Login', () => {
    cy
      .get(loginLink)
      .click()

    cy.get(emailInput)
      .should('have.value', '@liferay.com')
      .clear()
      .type(email)
      .should('have.value', email)

    cy
      .get(passwordInput)
      .should('not.have.value')
      .type(password)
      .should('have.value', password)

    cy.get(loginButton)
      .should('be.enabled')
      .click()
  })

  it('Página de Bem Vindo (Usuário Logado)', () => {
    cy.get(selectors.userAvatar).should('be.visible')
  })

  describe('Simulações de tela', () => {
    beforeEach(() => {
      cy
        .get('.product-menu.sidebar.sidebar-inverse')
        .as('sidebar')
    })

    it('Abrir simulador de telas', () => {
      cy.get('@sidebar')
        .should('not.be.visible')

      cy
        .get('#_com_liferay_product_navigation_simulation_web_portlet_SimulationPortlet_simulationToggleId')
        .parent()
        .click()

      cy.get('@sidebar').should('be.visible')
    })

    it('Verificar se o item padrão é Desktop', () => {
      cy.get('.default-devices button.selected').contains('Desktop')
    })

    it('Executar a simulação em diversos viewports', () => {
      const buttons = [
        'Desktop',
        'Tablet',
        'Mobile',
        'AutoSize',
        'Custom'
      ]

      cy.get('.default-devices button').should('have.length', 5).each((button, index) => {
        const actualButton = buttons[index]
        cy.get(button).as('button').click()
        cy.get('@button').contains(actualButton)
        cy.wait(1200)
      })

      cy.get('#_com_liferay_product_navigation_simulation_web_portlet_SimulationPortlet_height')
        .should('have.value', 600)
        .clear()
        .type(600)

      cy.get('#_com_liferay_product_navigation_simulation_web_portlet_SimulationPortlet_width')
        .should('have.value', 600)
        .clear()
        .type(800)
    })

    it('Fechar Sidebar de Simulação', () => {
      cy.get('@sidebar').within(() => {
        cy.get('#ored____').click()
      })
    })
  })
})
