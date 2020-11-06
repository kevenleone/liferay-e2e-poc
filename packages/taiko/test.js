const { $, button, click, closeBrowser, goto, into, openBrowser, title, write } = require('taiko')
const { constants, selectors } = require('@monorepo/test-base')

const assert = require('assert').strict

const Home = async () => {
  await openBrowser()
  await goto(constants.portalURL)

  const appTitle = await title()
  assert.strictEqual(appTitle, constants.portalHome.title)
}

const Login = async () => {
  await click('Sign In')
  const emailInput = await $(selectors.login.emailInput)
  const passwordInput = await $(selectors.login.passwordInput)
  await write(constants.credentials.login, into(emailInput))
  await write(constants.credentials.password, into(passwordInput))
  await click($(selectors.login.loginButton))
}

const Device = async () => {
  await click($(selectors.simulator.openSimulation))

  for (const device of constants.buttons) {
    await click(button(device))
  }
}

(async () => {
  await Home()
  await Login()
  await Device()
  await closeBrowser()
})()
