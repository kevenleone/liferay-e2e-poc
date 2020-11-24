export default class ObjectModule {
  private defaultTime: number;
  private selectors: any;

  constructor () {
    this.defaultTime = 1000;
    this.selectors = {
      addObject: '.btn-monospaced.btn-primary',
      popoverContinueCheck: 'input[type="checkbox"]',
      popoverNameInput: '#customObjectNameInput'
    };
  }

  visit (): void {
    cy.xpath(
      '//span[contains(text(), \'Objects\')]'
    ).click();
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
      cy.wait(this.defaultTime / 2);
      cy.get('tbody tr:nth-child(1) .dropdown-action').click();
      cy.get('.dropdown-menu.show').within(() => {
        cy.get('button').eq(5).click();
      });
    });
  }
}
