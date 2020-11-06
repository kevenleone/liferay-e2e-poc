const assert = require('assert')
const playwright = require('playwright')
const { selectors, constants } = require('@monorepo/test-base')
const { portalHome } = require('@monorepo/test-base/src/constants')

const { homePage, login } = selectors
const { portalURL } = constants

const Home = async (page) => {
  await page.goto(portalURL)
}

const Login = async (page) => {
  await page.click(login.loginLink)
  await page.type(selectors.login.emailInput, constants.credentials.login)
  await page.type(selectors.login.passwordInput, constants.credentials.password)
  await page.click(selectors.login.loginButton)
}

const Device = async (page) => {
  await page.waitForSelector(selectors.simulator.openSimulation)
  await page.dblclick(selectors.simulator.openSimulation)
  await page.click(
    '#controlMenu > li.control-menu-nav-category.user-control-group > ul > li.control-menu-nav-item.d-none.d-sm-inline-flex.simulation-icon'
  )
  await page.waitForTimeout(1000)

  let i = 1
  for (const device of constants.buttons) {
    await page.waitForTimeout(1000)
    await page.click(`div.row.default-devices > button:nth-child(${i})`)
    i++
  }

  await page.type(selectors.simulator.height, constants.simulator.height)
  await page.type(selectors.simulator.width, constants.simulator.width)
}

;(async () => {
  const browser = await playwright.chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()

  page.on('console', (msg) => console.log(msg.text()))

  page.on('pageerror', (exception) => {
    console.log(`Uncaught exception: "${exception}"`)
  })
  // page.click('', {})

  await Home(page)
  await Login(page)
  await Device(page)
})()
