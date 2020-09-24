import { constants, selectors } from '@monorepo/test-base'

const { login: loginSelector } = selectors;
const { credentials: { login, password } } = constants;

fixture`Liferay Portal`
    .page(constants.portalURL);

test('Do Login Action', async t => {
    await t
        .click(loginSelector.loginLink)
        .typeText(loginSelector.emailInput, login)
        .typeText(loginSelector.passwordInput, password)
        .click(loginSelector.loginButton)
        .click('[data-qa-id="applicationsMenu"]')
        .click('#senna_surface1 > div:nth-child(7) > div.fade.modal.d-block.applications-menu-modal.show > div > div > div > div > div.applications-menu-bg.applications-menu-border-top.applications-menu-content > div > div > div.col-lg-9.col-md-8 > div > div.tab-pane.active.show > div > div:nth-child(6) > ul > li:nth-child(3) > a > span')
        .click('#_com_liferay_app_builder_web_internal_portlet_ObjectsPortlet_-app-builder-root > div > div > nav > div > ul:nth-child(3) > li:nth-child(2) > div > button')
        .typeText('#customObjectNameInput', 'keven')
        ;
});

// test('Open Visit Page', async t => {
//     await t
        
// })

