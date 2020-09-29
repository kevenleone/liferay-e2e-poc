const { constants, selectors } = require('@monorepo/test-base')

const { homePage, login: loginSelector, simulator: simulatorSelector } = selectors
const {
  credentials: { email, password },
  portalHome,
  portalURL,
  simulator: simulatorConstant
} = constants

module.exports = {
  'Open Liferay Portal and Validate Items': (browser) => {
    browser.url(portalURL).waitForElementVisible('body')
    browser.expect.title().to.contain(portalHome.title)

    browser
      .expect
      .element(homePage.helloWorldContainer)
      .text
      .to
      .contain(portalHome.helloWorld)

    browser
      .expect
      .element(homePage.welcomeContainer)
      .text
      .to
      .contain(portalHome.welcome)

    browser
      .expect
      .element('#footer')
      .text
      .to
      .contain(portalHome.footer)
  },
  'Open Liferay Portal and do Login': browser => {
    const { emailInput, loginButton, loginLink, passwordInput } = loginSelector
    browser
      .url(portalURL)
      .waitForElementVisible('body')

    browser
      .click(loginLink)

    browser
      .expect
      .element(emailInput)
      .to
      .have
      .value
      .that
      .equals('@liferay.com')

    browser
      .clearValue(emailInput)
      .setValue(emailInput, email)

    // isso aqui da erro!
    // browser
    //   .expect
    //   .element(emailInput)
    //   .to
    //   .have
    //   .value
    //   .that
    //   .equals(email)

    browser
      .expect
      .element(passwordInput)
      .to
      .have
      .value
      .that
      .equals('')

    browser
      .clearValue(passwordInput)
      .setValue(passwordInput, password)

    browser
      .click(loginButton)

    browser
      .waitForElementVisible(selectors.userAvatar)
  },
  'Welcome Page': (browser) => {
    browser
      .expect
      .element(selectors.userAvatar)
      .to
      .be
      .visible
  },
  'Open Screen simulator and run simulations': (browser) => {
    browser
      .click(simulatorSelector.openSimulation)
      .click(simulatorSelector.openSimulation)

    browser
      .waitForElementVisible(simulatorSelector.sidebar)

    let i = 1
    for (const device of constants.buttons) {
      const selector = `.default-devices button:nth-child(${i})`
      browser.click(selector)
      browser.expect.element(`${selector} small`).text.to.contain(device)
      i++
    }

    browser
      .expect
      .element(simulatorSelector.height)
      .to
      .have
      .value
      .that
      .equals(simulatorConstant.defaultValue)

    browser
      .expect
      .element(simulatorSelector.width)
      .to
      .have
      .value
      .that
      .equals(simulatorConstant.defaultValue)

    browser
      .clearValue(simulatorSelector.height)
      .setValue(simulatorSelector.height, simulatorConstant.height)

    browser
      .clearValue(simulatorSelector.width)
      .setValue(simulatorSelector.width, simulatorConstant.width)

    browser.end()
  }
}
