const Portal = require('../portal')
const TableView = require('../table-view')
const ObjectModule = require('../object')
const FormView = require('../form-view/')
const App = require('../app')

class TestRunner {
  constructor (config) {
    this.defaultTime = 1000

    this.app = new App(config)
    this.formView = new FormView(config)
    this.tableView = new TableView(config)
    this.portal = new Portal(config)
    this.object = new ObjectModule(config)
  }

  preserve () {
    Cypress.Cookies.defaults({
      preserve: [
        'JSESSIONID',
        'LFR_SESSION_STATE_20126',
        'SCREEN_NAME',
        'COMPANY_ID',
        'GUEST_LANGUAGE_ID',
        'LFR_SESSION_STATE_20103',
        'COOKIE_SUPPORT'
      ]
    })
  }
}

module.exports = TestRunner
