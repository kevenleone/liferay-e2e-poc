const TestBase = require('../utils/TestBase')

class TableView extends TestBase {
  constructor () {
    super()
    this.selectors = {
      closeSidebar: '.close-sidebar-btn',
      emptyDragzone: '.empty-drop-zone',
      newTableView: '.nav-item button.btn-primary',
      openSidebar: '.open-sidebar-btn'
    }
  }

  visit () {
    this.changeObjectTab(1)
  }

  newTableView () {
    cy.get(this.selectors.newTableView).click()
  }

  setTitle (name) {
    this.managementTitle(name)
  }

  closeSidebar () {
    cy.get(this.selectors.closeSidebar).click({ force: true })
  }

  openSidebar () {
    cy.get(this.selectors.openSidebar).click({ force: true })
  }

  emptyDragzone () {
    cy.get(this.selectors.emptyDragzone).should('be.visible')
  }

  pipeline (name, fieldTypes) {
    it('Open Add TableView', () => {
      this.visit()
      this.newTableView()
    })

    it('Should set TableView title', () => {
      this.setTitle(name)
    })

    it('Should Collapse (close) Sidebar', () => {
      this.closeSidebar()
    })

    it('Should Collapse (open) Sidebar', () => {
      this.openSidebar()
    })

    it('Layout should be empty', () => {
      this.emptyDragzone()
    })

    it(`Should have ${fieldTypes.length} items on the list`, () => {
      cy.get('.tab-content .field-type').should('have.length', fieldTypes.length)
    })

    fieldTypes.forEach(({ config }) => {
      const { label } = this.getLocalizedConfig(config)
      describe(`Should do action on [${label}] column created on FormView`, () => {
        const findByLabel = () => cy.get('.list-group-title span').contains(label)
        it(`Column [${label}] matches with the FormView item label`, () => {
          findByLabel()
        })

        it('Should search find matching value', () => {
          cy.get('.sidebar-section input')
            .should('not.have.value')
            .type(label)
            .should('have.value', label)
            .as('input')
          findByLabel()
          cy.get('@input').clear()
        })

        it('Add item on the list', () => {
          cy.get('.tab-content .field-type')
            .contains(label)
            .dblclick()
            .as('item')
          cy.get('@item')
            .parent()
            .parent()
            .parent()
            .should('have.class', 'disabled')
        })

        it('The item should be on Table List', () => {
          cy.get('.container.table-view-container th').contains(label)
        })
      })
    })

    describe('Save and validate the TableView', () => {
      it('Should save the Table View', () => {
        cy.get('.btn-primary').click()
      })

      it('Validate ListView', () => {
        this.validateListView(name)
      })
    })
  }
}

module.exports = TableView
