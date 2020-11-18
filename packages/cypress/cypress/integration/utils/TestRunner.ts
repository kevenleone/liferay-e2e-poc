import App from '../app';
import FormView from '../form-view';
import ObjectModule from '../object';
import Portal from '../portal';
import TableView from '../table-view';
import { Config } from './interfaces';

class TestRunner {
  public defaultTime: number;
  public app: App;
  public formView: FormView;
  public tableView: TableView;
  public portal: Portal;
  public object: ObjectModule;

  constructor (config: Config) {
    this.defaultTime = 1000;

    this.app = new App(config);
    this.formView = new FormView();
    this.tableView = new TableView(config);
    this.portal = new Portal();
    this.object = new ObjectModule();
  }

  private keepCookies (cookies: Array<string>) {
    Cypress.Cookies.defaults({
      preserve: cookies
    });
  }

  preserve (): void {
    this.keepCookies([
      'JSESSIONID',
      'LFR_SESSION_STATE_20126',
      'SCREEN_NAME',
      'COMPANY_ID',
      'GUEST_LANGUAGE_ID',
      'LFR_SESSION_STATE_20103',
      'COOKIE_SUPPORT'
    ]);
  }

  private beforeAllTest () {
    this.keepCookies([]);
    Cypress.LocalStorage.clear();
    cy.clearCookies({ log: true });
    cy.clearLocalStorage({ log: true });
    cy.visit('http://localhost:8080');
  }

  teardown () {
    cy.log('Running teardown and cleaning cookies, localstorage');
    this.beforeAllTest();
  }
}

export default TestRunner;
