const Portal = require('../portal')
const ObjectModule = require('../object')
const TestBase = require('../utils/TestBase')
const FormView = require('../form-view/')
const TableView = require('../table-view')
const App = require('../app')

class ViewEntryDetails extends TestBase {
  constructor () {
    super()
    this.selectors = {}
    this.portal = new Portal()
    this.object = new ObjectModule()
    this.formView = new FormView()
    this.tableView = new TableView()
    this.app = new App()
    this.config = {
      name: {
        appName: { 'en-US': 'My App' },
        formViewName: { 'en-US': 'My Form' },
        tableViewName: { 'en-US': 'My Table' }
      }
    }

    this.fieldTypes = [
      {
        config: {
          label: { 'en-US': 'Full Name', 'pt-BR': 'Nome Completo' },
          repeatable: false,
          required: false,
          showLabel: true
        },
        name: 'Text',
        type: 'text'
      },
      {
        config: {
          dragType: 'dragBottom',
          label: { 'en-US': 'Departament', 'pt-BR': 'Departamento' },
          options: [
            { 'en-US': 'Human Resources', 'pt-BR': 'Recursos Humanos' },
            { 'en-US': 'Engineering', 'pt-BR': 'Engenharia' }
          ],
          repeatable: false,
          required: true,
          showLabel: true
        },
        name: 'Select from List',
        type: 'select'
      }]
  }

  test () {
    describe('ViewEntryDetails', () => {
      this.portal.test()

      beforeEach(() => {
        this.preserve()
        cy.wait(this.defaultTime / 10)
      })

      describe('Object', () => {
        it('Visit App Builder Object', () => {
          this.object.visit()
        })

        it('Delete all existing Objects', () => {
          this.object.deleteAllObjects()
        })

        it('Create an Object', () => {
          this.object.createAnObject('Testando')
        })
      })

      describe('FormView', () => {
        this.formView.composeFields(this.fieldTypes, {})

        describe('Save it', () => {
          it('Set title', () => {
            this.formView.setTitle(this.config.name.formViewName['en-US'])
          })

          it('Save', () => {
            this.formView.submitForm()
          })
        })
      })

      describe('TableView', () => {
        this.tableView.pipeline(this.config.name.tableViewName, this.fieldTypes)
      })

      describe('App', () => {
        this.app.pipeline(this.config.name, { product: true, standalone: true, widget: false }, false)
      })

      describe('Application Menu', () => {
        it('Go to home', () => {
          this.portal.visit()
        })

        it('Open Menu', () => {
          this.portal.openApplicationMenu()
        })

        it('Open Application Menu App', () => {
          cy.visit('http://localhost:8080/group/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ProductMenuAppPortlet_39533applications&p_p_lifecycle=0&p_p_state=maximized&p_v_l_s_g_id=20121&p_p_auth=sOz3SkYS#/')
        })
      })
    })
  }
}

new ViewEntryDetails().test()
