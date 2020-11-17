/// <reference types="cypress" />

const TestBase = require('../utils/TestBase')

class SignInPage extends TestBase {
  constructor () {
    super()
    this.selectors = {
      applicationMenu: '[data-qa-id="applicationsMenu"]',
      emailInput: '#_com_liferay_login_web_portlet_LoginPortlet_login',
      passwordInput: '#_com_liferay_login_web_portlet_LoginPortlet_password',
      signIn: 'span.sign-in a',
      submitButton: '.button-holder button'
    }
  }

  openApplicationMenu () {
    cy.get(this.selectors.applicationMenu).click()
  }

  visit () {
    cy.visit('http://localhost:8080')
  }

  signIn (email = 'test@liferay.com', password = 'test') {
    const { emailInput, passwordInput, signIn, submitButton } = this.selectors

    cy.get(signIn).click()

    cy.get(emailInput)
      .clear()
      .type(email)

    cy
      .get(passwordInput)
      .type(password)

    cy.get(submitButton).click()
  }

  test () {
    describe('Open Portal and Sign In', () => {
      it('Open Home', () => {
        this.visit()
      })

      it('Sign In', () => {
        this.signIn()
      })
    })
  }
}

module.exports = SignInPage
