import { Config } from '../utils/interfaces';
import TestRunner from '../utils/TestRunner';

const testConfig = {
  app: {
    config: { product: true, standalone: true, widget: false },
    name: {
      'en-US': 'Vacation Request - LATAM'
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
    name: { 'en-US': 'Vacation Request' }
  },
  object: { name: 'Vacation Request' },
  tableView: {
    name: {
      'en-US': 'Vacation Request - LATAM'
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
      before(() => {
        // this.teardown();
        // cy.login();
      });

      beforeEach(() => {
        this.preserve();
        cy.wait(this.defaultTime / 10);
      });

      // describe('Object', () => {
      //   before(() => {
      //     cy.wait(this.defaultTime);
      //   });

      //   it('Visit App Builder Object', () => {
      //     this.object.visit();
      //   });

      //   it('Delete all existing Objects', () => {
      //     this.object.deleteAllObjects();
      //   });

      //   it('Create an Object', () => {
      //     this.object.createAnObject(this.config.object.name);
      //   });
      // });

      // describe('FormView', () => {
      //   this.formView.composeFields(this.config.formView.fieldTypes, {});

      //   describe('Save it', () => {
      //     it('Set title', () => {
      //       this.formView.setTitle(this.config.formView.name['en-US']);
      //     });

      //     it('Save', () => {
      //       this.formView.submitForm();
      //     });
      //   });
      // });

      // describe('TableView', () => {
      //   this.tableView.pipeline();
      // });

      // describe('App', () => {
      //   this.app.pipeline();
      // });

      describe('Application Menu', () => {
        it('Go to home', () => {
          this.portal.visit();
        });

        it('Open Menu', () => {
          this.portal.openApplicationMenu();
        });

        it('Open Application Menu App', () => {
          cy.xpath(`//span[contains(text(), '${this.config.app.name['en-US']}')]`).click();
        });
      });
    });
  }
}

new ViewEntryDetails().test();
