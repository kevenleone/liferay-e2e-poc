export default class ObjectModule {
  private defaultTime: number;
  private constants: any;
  private selectors: any;

  constructor () {
    this.defaultTime = 1000;
    this.constants = {
      objectUrl:
        'http://localhost:8080/group/guest/~/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ObjectsPortlet&p_p_lifecycle=0&p_p_state=maximized&p_v_l_s_g_id=20121&p_p_auth=UmUpZGeL'
    };
    this.selectors = {
      addObject: '.nav-item button.btn-primary',
      popoverContinueCheck: 'input[type="checkbox"]',
      popoverNameInput: '#customObjectNameInput'
    };
  }

  visit (): void {
    cy.visit(this.constants.objectUrl);
  }

  createAnObject (name: string, unCheck = false): void {
    const {
      addObject,
      popoverContinueCheck,
      popoverNameInput
    } = this.selectors;
    cy.get(addObject).click();

    cy.get('.popover.mw-100').within(() => {
      if (unCheck) {
        cy.get(popoverContinueCheck).should('be.checked').uncheck();
      }
      cy.get(popoverNameInput).type(`${name}{enter}`, {
        delay: 20
      });
    });
  }

  deleteAllObjects (): void {
    cy.get('tbody tr').each(() => {
      cy.wait(this.defaultTime);
      cy.get('tbody tr:nth-child(1) .dropdown-action').click();
      cy.get('.dropdown-menu.show').within(() => {
        cy.get('button').eq(5).click();
      });
    });
  }
}
