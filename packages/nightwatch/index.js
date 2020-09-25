const { constants, selectors } = require('@monorepo/test-base')

const { credentials: { login, password }, portalURL } = constants
const { login: { emailInput, loginButton, loginLink, passwordInput } } = selectors

module.exports = {
  'Open Liferay Portal': function (browser) {
    browser
      .url(portalURL)
      .waitForElementVisible('body')
      .click(loginLink)
      .setValue(emailInput, login)
      .assert.visible('button[type=submit]')
      .setValue(passwordInput, password)
      .click(loginButton)

    browser.end()
  }
}
