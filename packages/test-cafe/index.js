import { Selector } from 'testcafe';
import { constants, selectors } from '@monorepo/test-base'

const { login: loginSelector } = selectors;
const { credentials: { login, password } } = constants;

// await t
//     .typeText('#developer-name', 'John Smith')
//     .click('#submit-button');

// const articleHeader = await Selector('.result-content').find('h1');

// // Obtain the text of the article header
// let headerText = await articleHeader.innerText;

fixture`Liferay Portal`
    .page(constants.portalURL);

test('Do Login Action', async t => {
    await t
        .click(loginSelector.loginLink)
        .typeText(loginSelector.emailInput, login)
        .typeText(loginSelector.passwordInput, password)
        .click(loginSelector.loginButton);
});

fixture`App builder - Object`
    .page(constants.modules.object)

test('Open Visit Page', async t => {

})
