import App from '../app';
import Entry from '../entry';
import FormView from '../form-view';
import ObjectModule from '../object';
import Portal from '../portal';
import TableView from '../table-view';
import { Config } from './interfaces';

class TestRunner {
  public defaultTime: number;
  public App: App;
  public FormView: FormView;
  public TableView: TableView;
  public Portal: Portal;
  public Object: ObjectModule;
  public Entry: Entry

  constructor (config: Config) {
    this.defaultTime = 1000;
    this.App = new App(config);
    this.FormView = new FormView();
    this.TableView = new TableView(config);
    this.Portal = new Portal();
    this.Object = new ObjectModule();
    this.Entry = new Entry(config);
  }

  private beforeAllTest () {
    this.keepCookies([]);
    Cypress.LocalStorage.clear();
    cy.clearCookies({ log: true });
    cy.clearLocalStorage({ log: true });
    cy.visit('http://localhost:8080');
  }

  private keepCookies (cookies: Array<string>) {
    Cypress.Cookies.defaults({
      preserve: cookies
    });
  }

  public preserve (): void {
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

  public teardown (): void {
    cy.log('Running teardown and cleaning cookies, localstorage');
    this.beforeAllTest();
  }
}

export default TestRunner;
