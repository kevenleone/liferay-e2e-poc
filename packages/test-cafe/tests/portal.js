import { constants, selectors } from '@monorepo/test-base'
import { Role, Selector } from 'testcafe'

const { homePage, login: loginSelector, simulator: simulatorSelector } = selectors
const {
  credentials: { email, password },
  portalHome,
  simulator: simulatorConstant
} = constants

const loggedUser = Role(constants.portalURL, async (t) => {
  const [emailInput, passwordInput, loginButton] = [
    Selector(loginSelector.emailInput),
    Selector(loginSelector.passwordInput),
    Selector(loginSelector.loginButton)
  ]

  await t
    .click(loginSelector.loginLink)

  await t
    .expect(emailInput.value).eql('@liferay.com')
    .selectText(emailInput)
    .pressKey('delete')
    .typeText(emailInput, email)
    .expect(emailInput.value).eql(email)

  await t
    .expect(passwordInput.value).eql('')
    .typeText(passwordInput, password)
    .expect(passwordInput.value).eql(password)

  await t
    .expect(loginButton.hasAttribute('disabled')).notOk()

  await t
    .click(loginButton)
})

// eslint-disable-next-line no-undef
fixture`Liferay Portal`
  .page(constants.portalURL)

test('Open Liferay Portal and Validate Items', async t => {
  const [helloWorld, welcome, footer] = [
    Selector(homePage.helloWorldContainer).textContent,
    Selector(homePage.welcomeContainer).textContent,
    Selector('#footer').textContent
  ]

  await t
    .expect(helloWorld).contains(portalHome.helloWorld)
    .expect(welcome).contains(portalHome.welcome)
    .expect(footer).contains(portalHome.footer)
})

test('Welcome Page', async t => {
  const userAvatar = Selector(selectors.userAvatar)

  await t
    .useRole(loggedUser)
    .expect(userAvatar.exists).eql(true)
})

test('Open screen simulator and run simulations', async t => {
  const [sidebar, openSimulation, height, width, closeSimulator] = [
    Selector(simulatorSelector.sidebar),
    Selector(simulatorSelector.openSimulation),
    Selector(simulatorSelector.height),
    Selector(simulatorSelector.width),
    Selector(simulatorSelector.closeSimulator)
  ]

  await t.useRole(loggedUser)

  await t
    .expect(sidebar.visible).eql(false)
    .click(openSimulation)
    .expect(sidebar.visible).eql(true)

  let i = 1
  for (const device of constants.buttons) {
    const selector = `.default-devices button:nth-child(${i})`
    const device = Selector(selector)
    await t.click(device)
    i++
  }

  await t
    .expect(height.value)
    .eql(simulatorConstant.defaultValue)
    .selectText(height)
    .pressKey('delete')
    .typeText(height, simulatorConstant.height)
    .expect(height.value).eql(simulatorConstant.height)

  await t
    .expect(width.value)
    .eql(simulatorConstant.defaultValue)
    .selectText(width)
    .pressKey('delete')
    .typeText(width, simulatorConstant.width)
    .expect(width.value).eql(simulatorConstant.width)

  await t.click(closeSimulator)
  await t
    .expect(sidebar.visible).eql(false)
})
