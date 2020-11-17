import { Config } from '../utils/interfaces';
import TestRunner from '../utils/TestRunner';

const testConfig = {
  app: {
    config: { product: true, standalone: true, widget: false },
    name: {
      'en-US': 'Vacation Request - LATAM',
      'pt-BR': 'Solicitação de Férias - LATAM'
    }
  },
  formView: {
    fieldTypes: [
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
      }
    ],
    name: { 'en-US': 'Vacation Request', 'pt-BR': 'Solicitação de Férias' }
  },
  object: { name: 'Vacation Request' },
  tableView: {
    name: {
      'en-US': 'Vacation Request - LATAM',
      'pt-BR': 'Solicitação de Férias - LATAM'
    },
    selectedFields: [
      { label: 'Full Name', value: 'Full Name' },
      { label: 'Departament', value: 'Departament' }
    ]
  }
};

class ViewEntryDetails extends TestRunner {
  config: Config;
  selectors: any;

  constructor () {
    super(testConfig);
    this.config = testConfig;
    this.selectors = {};
  }

  test () {
    describe('ViewEntryDetails', () => {
      this.portal.test();

      beforeEach(() => {
        this.preserve();
        cy.wait(this.defaultTime / 10);
      });

      describe('Object', () => {
        it('Visit App Builder Object', () => {
          this.object.visit();
        });

        it('Delete all existing Objects', () => {
          this.object.deleteAllObjects();
        });

        it('Create an Object', () => {
          this.object.createAnObject('Testando');
        });
      });

      describe('FormView', () => {
        this.formView.composeFields(this.config.formView.fieldTypes, {});

        describe('Save it', () => {
          it('Set title', () => {
            this.formView.setTitle(this.config.formView.name['en-US']);
          });

          it('Save', () => {
            this.formView.submitForm();
          });
        });
      });

      describe('TableView', () => {
        this.tableView.pipeline();
      });

      describe('App', () => {
        this.app.pipeline();
      });

      describe('Application Menu', () => {
        it('Go to home', () => {
          this.portal.visit();
        });

        it('Open Menu', () => {
          this.portal.openApplicationMenu();
        });

        it('Open Application Menu App', () => {
          cy.visit(
            'http://localhost:8080/group/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ProductMenuAppPortlet_39533applications&p_p_lifecycle=0&p_p_state=maximized&p_v_l_s_g_id=20121&p_p_auth=sOz3SkYS#/'
          );
        });
      });
    });
  }
}

new ViewEntryDetails().test();
