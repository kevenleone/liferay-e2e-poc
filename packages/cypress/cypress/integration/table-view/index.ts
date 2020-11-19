import { LocalizableValue } from '../utils/interfaces';
import TestBase from '../utils/TestBase';

export default class TableView extends TestBase {
  private selectors: any;
  private config: any;

  constructor (config) {
    super();
    this.config = config;
    this.selectors = {
      closeSidebar: '.close-sidebar-btn',
      emptyDragzone: '.empty-drop-zone',
      newTableView: '.nav-item button.btn-primary',
      openSidebar: '.open-sidebar-btn',
      saveButton: '.btn-primary'
    };
  }

  visit (): void {
    this.changeObjectTab(1);
  }

  newTableView (): void {
    cy.get(this.selectors.newTableView).click();
  }

  setTitle (name: LocalizableValue): void {
    this.managementTitle(name);
  }

  private closeSidebar (): void {
    cy.get(this.selectors.closeSidebar).click({ force: true });
  }

  private openSidebar (): void {
    cy.get(this.selectors.openSidebar).click({ force: true });
  }

  emptyDragzone (): void {
    cy.get(this.selectors.emptyDragzone).should('be.visible');
  }

  pipeline (): void {
    const {
      formView: { fieldTypes },
      tableView: { name }
    } = this.config;

    it('Open Add TableView', () => {
      this.visit();
      this.newTableView();
    });

    it('Should set TableView title', () => {
      this.setTitle(name);
    });

    it('Should Collapse (close) Sidebar', () => {
      this.closeSidebar();
    });

    it('Should Collapse (open) Sidebar', () => {
      this.openSidebar();
    });

    it('Layout should be empty', () => {
      this.emptyDragzone();
    });

    it(`Should have ${fieldTypes.length} items on the list`, () => {
      cy.get('.tab-content .field-type').should(
        'have.length',
        fieldTypes.length
      );
    });

    fieldTypes.forEach(({ config }) => {
      const { label } = this.getLocalizedConfig(config);
      describe(`Should act on [${label}] column created on FormView`, () => {
        it(`Column [${label}] matches with the FormView item label`, () => {
          cy.get('.list-group-title span').contains(label);
        });

        it('Should search find matching value', () => {
          cy.get('.sidebar-section input')
            .should('not.have.value')
            .type(label)
            .should('have.value', label)
            .as('input');
          cy.get('.list-group-title span').contains(label);
          cy.get('@input').clear();
        });

        it('Add item on the list', () => {
          cy.get('.tab-content .field-type')
            .contains(label)
            .dblclick()
            .as('item');
          cy.get('@item')
            .parent()
            .parent()
            .parent()
            .should('have.class', 'disabled');
        });

        it('The item should be on Table List', () => {
          cy.get('.container.table-view-container th').contains(label);
        });
      });
    });

    describe('Save and validate the TableView', () => {
      it('Should save the Table View', () => {
        cy.get(this.selectors.saveButton).click();
      });

      xit('Validate ListView', () => {
        this.validateListView(name);
      });
    });
  }
}
