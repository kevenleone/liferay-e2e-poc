# E2E frameworks analysis

## Candidates

- Test Café
- Cypress
- NightWatch
- Taiko
- PlayWright
- Robot Framework

## Test Case / Step by Step

The tests were made based on the following scenarios

1. Open Liferay Portal
    1. Check if the text "**Hello World**" is present
    2. Check if text "**Welcome to Liferay Community**" is present
    3. Check if the page title (the same over the tab) is **"Home - Liferay"**
    4. check if footer **contains the text** "**Powered By**"
2. Do the sign in
    1. Click on "**Sign In**" name (the anchor)
    2. Check if Email Address already have "**@liferay.com**" filled.
    3. Remove the predefined value in "**Email Address"** and type  "**test@liferay.com**", check if the value **"test@liferay.com"** is present.
    4. Check if Password is **empty** and type "**test**"
    5. Check if "**Sign In**" button is enabled and click on it.
3. Welcome Page (**After Login**)
    1. Check if "**user avatar**" is present.
    2. Check if the right sidebar is not visible.
    3. Open Simulation Guide
    4. Select all screen options available
    5. Set up a custom resolution, for example 6**00x800**

# Test Café

[DevExpress/testcafe](https://github.com/DevExpress/testcafe)

### Browsers

- Google Chrome: Stable, Beta, Dev and Canary
- Internet Explorer (11+)
- Microsoft Edge (legacy and Chromium-based)
- Mozilla Firefox
- Safari
- Google Chrome mobile
- Safari mobile

### Pros

- Fast test execution
- Headless mode
- Custom Reporters
- Promises Based
- Compatible with popular CI
- HTTP Intercept / Mock
- Record Screenshots and Videos
- Great Documentation
- The giant cursor helps the users follow each step
- Concurrent Test
- Live Watch - Hot Reloading

### Cons

- Sometimes it's hard to debug a test error
- The community it's still growing and examples and helps/tutorials are sparse
- No way to debug the test while test is going on
- Some icons disappear on tests execution

![E2E%20frameworks%20analysis%202790ea7b03d64398b8f9d0dac0e4a8e5/Untitled.png](assets/Untitled.png)

![assets/Untitled%201.png](assets/Untitled%201.png)

![assets/Untitled%202.png](assets/Untitled%202.png)

![assets/Untitled%203.png](assets/Untitled%203.png)

- Uncaught errors simply closes the browser and tests are stopped.
- No way to create multiple describe and test scope

### Test result

⏱️ Test done after 15s without any wait

✅ Test passed with assertions 

## Cypress

[JavaScript End to End Testing Framework](https://www.cypress.io/)

### Browsers

- Google Chrome: Stable, Beta, Dev and Canary
- Microsoft Edge
- Mozilla Firefox
- Electron
- Brave

### Pros

- Fast test execution
- Headless mode
- Custom Reporters
- Compatible with popular CI
- HTTP Intercept / Mock
- Record Screenshots and Videos
- Great Documentation
- Debug While tests are running
- Time Travel
- Automatic waiting
- Viewport size
- Common test syntax using Describe and It

### Cons

- It's not compatible with Safari and Internet Explorer
- Cannot run multiple browsers at the same time
- Cypress is not a general purpose automation tool.
- Each Cypress Test must be used inside a Test scope and cannot be associated to an variable

### Test result

⏱️ Test done after 4.53s without any wait

✅ Test passed with assertions 

# Nightwatch

[nightwatchjs/nightwatch](https://github.com/nightwatchjs/nightwatch)

Nightwatch.js is an automated end-to-end testing framework for web applications and websites. It is written in Node.js and uses the W3C WebDriver API (formerly Selenium WebDriver) for interacting with various browsers.

### Browsers

- Safari
- Chrome
- Firefox

### Pros

- Fast test execution
- Headless Mode

### Cons

- No watch mode
- Too verbose
- Test failures closes the browser and not execute other tests
- Asserts not matching after type on Input
- Week API
- No Intelisense on VScode
- No wait or Automatic waiting strategy

### Test result

⏱️ Test done after 6.87s without any wait

✅ Test passed with assertions 

### Taiko

[getgauge/taiko](https://github.com/getgauge/taiko)

### Browsers

- Chrome/Chromium
- Microsoft Edge
- Opera (unverified)
- Firefox (experimental)

### Pros

- Selector in evidence during the test execution
- Log well detailed
- Simplified Syntax

### Cons

- Week API
- Week Documentation
- Assertion API aside
- Slow Execution

### Test result

⏱️ Test done after 54.24s

⚠️ Test passed without assertions 

## Playwright

[microsoft/playwright](https://github.com/microsoft/playwright)

### Browsers

- Chromium
- Firefox
- Webkit

### Pros

- Selector in evidence during the test execution
- Log well detailed
- Simplified Syntax
- Good to emulate geolocation and mobile devices
- Auto wait elements
- Screenshots
- Network intercept
- Fast test execution
- Headless mode
- CI Integration

### Cons

- Week Documentation
- Assertion API aside
- Few browsers to play
- No videos recording by default
- You may have bad experience without using page objects to driver your test

### Test result

⏱️ Test done after 4.72s without any wait

⚠️ Test passed without assertions


# Robot Framework

[Robot Framework](https://robotframework.org/)

### Browsers

- Firefox
- Google Chrome
- Edge
- Safari
- Opera
- Android
- Iphone
- PhantomJS
- HTMLUnit
- HTMLUnit with Jasvascript

### Pros

- Great Documentation
- Fast test execution
- Simplified natural language
- Integration with jenkins
- Headless mode
- Custom Reporters
- HTTP Mock
- Record Screenshots
- Concurrent Test
- Intellisense

### Cons

- Lack of experience with the framework
- This high-level syntax may prevent us from controlling more low-level features

### Test result
⏱️ Test done after 4.5s

✅ Test passed with assertions
