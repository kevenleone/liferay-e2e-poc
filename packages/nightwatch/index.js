const {constants, selectors} = require('@monorepo/test-base');

const {portalURL, credentials: {login, password}} = constants;
const {login: {loginLink, emailInput, loginButton,passwordInput}} = selectors;

module.exports = {
    'Open Liferay Portal' : function(browser) {
      browser
        .url(portalURL)
        .waitForElementVisible('body')
        .click(loginLink)
        .setValue(emailInput, login)
        .assert.visible('button[type=submit]')
        .setValue(passwordInput, password)
        .click(loginButton)

        browser.end();
    }
  };
