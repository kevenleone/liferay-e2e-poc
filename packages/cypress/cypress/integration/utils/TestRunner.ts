import App from '../app';
import FormView from '../form-view';
import ObjectModule from '../object';
import Portal from '../portal';
import TableView from '../table-view';

class TestRunner {
  public defaultTime: number;
  public app: App;
  public formView: FormView;
  public tableView: TableView;
  public portal: Portal;
  public object: ObjectModule;

  constructor (config: any) {
    this.defaultTime = 1000;

    this.app = new App(config);
    this.formView = new FormView();
    this.tableView = new TableView(config);
    this.portal = new Portal();
    this.object = new ObjectModule();
  }

  preserve (): void {
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
    });
  }
}

export default TestRunner;
