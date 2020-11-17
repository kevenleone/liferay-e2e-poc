const TestBase = require('../utils/TestBase')

class App extends TestBase {
  constructor (config) {
    super()
    this.config = config
    this.selectors = {
      primaryButton: 'button.btn.btn-primary'
    }
  }

  _validateCreatedItemInForm (item) {
    if (item) {
      const value = item[this.getLanguageId()] || item[this.getDefaultLanguageId()]
      const fakeValue = 'keven'
      cy.get(this.selectors.primaryButton).should('be.disabled')
      cy.get('tbody tr').as('row').should('have.length', 1)
      cy.get('.input-group-item input')
        .eq(1)
        .as('search')
        .should('not.have.value')
        .type(fakeValue)

      cy.get('@row')
        .should('not.exist')

      this.emptyState()

      cy.get('@search')
        .should('have.value', fakeValue)
        .clear()
        .type(value)
    }

    cy.get('tbody tr').eq(0).click()
    cy.get(this.selectors.primaryButton).click()
  }

  _deployAs (options = {}) {
    cy.get(this.selectors.primaryButton).should('be.disabled')

    const onToggle = (index, name) => {
      cy.get('.toggle-switch-check')
        .eq(index)
        .should('not.be.checked')
        .check()
        .should('be.checked')
        .uncheck()
        .as(name)
    }

    onToggle(0, 'widget')
    onToggle(1, 'standalone')
    onToggle(2, 'product')

    Object.keys(options).map((key) => {
      if (options[key]) {
        cy.get(`@${key}`).check().should('be.checked')
      }
    })
  }

  pipeline (openStandalone = true) {
    const { app: { config, name }, formView: { name: formViewName }, tableView: { name: tableViewName } } = this.config
    it('Should open [App] Tab', () => {
      this.changeObjectTab(2)
    })

    it('Should contains an empty state', () => {
      this.emptyState()
    })

    it('Click on Add App', () => {
      cy.get('.nav-item button.btn-primary').click()
    })

    it('Should set App title', () => {
      this.managementTitle(name)
    })

    it('Should validate [FormView] content', () => {
      this._validateCreatedItemInForm(formViewName)
    })

    it('Should validate [TableView] content', () => {
      this._validateCreatedItemInForm(tableViewName)
    })

    it('Should validate [Workflow] content', () => {
      this._validateCreatedItemInForm()
    })

    it(`Should check options ${Object.keys(config).join(', ')}`, () => {
      this._deployAs(config)
    })

    let standaloneApp

    it('Should save the App with sucesss', () => {
      cy.get(this.selectors.primaryButton).should('be.enabled').click()
      cy.get('.alert-container .alert-notifications a').then(doc => {
        standaloneApp = doc[0].href
      })
    })

    it('Validate ListView', () => {
      this.validateListView(name)
    })

    if (openStandalone) {
      it('Open Standalone App', () => {
        cy.visit(standaloneApp)
      })
    }
  }
}

module.exports = App
