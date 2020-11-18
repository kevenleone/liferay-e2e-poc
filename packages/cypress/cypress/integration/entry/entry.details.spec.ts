import { Config } from '../utils/interfaces';
import TestRunner from '../utils/TestRunner';
import { EntryDetailsConfig } from './fixtures';
class ViewEntryDetails extends TestRunner {
  config: Config;
  selectors: any;

  constructor () {
    super(EntryDetailsConfig);
    this.config = EntryDetailsConfig;
    this.selectors = {};
  }

  run () {
    describe('ViewEntryDetails', () => {
      before(() => {
        this.teardown();
        cy.login();
      });

      beforeEach(() => {
        this.preserve();
        cy.wait(this.defaultTime / 10);
      });

      describe('Object Page', () => {
        before(() => {
          cy.wait(this.defaultTime);
        });

        it('Visit App Builder Object', () => {
          this.object.visit();
        });

        it('Delete all existing Objects', () => {
          this.object.deleteAllObjects();
        });

        it('Create an Object', () => {
          this.object.createAnObject(this.config.object.name);
        });
      });

      describe('FormView Page', () => {
        this.formView.composeFields(this.config.formView.fieldTypes, {
          addField: true,
          doAction: true
        });

        describe('Save it', () => {
          it('Set title', () => {
            this.formView.setTitle(this.config.formView.name['en-US']);
          });

          it('Save', () => {
            this.formView.submit();
          });
        });
      });

      describe('TableView Page', () => {
        this.tableView.pipeline();
      });

      describe('App Page', () => {
        this.app.pipeline();
      });

      describe('Application Page', () => {
        after(() => {
          this.Entry.deleteAllEntries();
          this.Entry.emptyState();
        });

        const [
          firstField,
          {
            config: { value: secondValue }
          }
        ] = this.config.formView.fieldTypes;

        const {
          config: { value: firstValue }
        } = firstField;

        describe('Should Open Application and Application', () => {
          it('Go to home', () => {
            this.portal.visit();
          });

          it('Open Menu', () => {
            this.portal.openApplicationMenu();
          });

          it('Open Application Menu App', () => {
            cy.xpath(
              `//span[contains(text(), '${this.config.app.name['en-US']}')]`
            ).click();
          });
        });

        describe('Should validate HomeScreen', () => {
          it('Should have empty state', () => {
            this.Entry.emptyState();
          });

          it('Add Entry', () => {
            this.Entry.addEntry();
          });
        });

        this.Entry.fillForm();

        describe('Should save entry', () => {
          it('Save', () => {
            this.Entry.submit();
          });

          it('Check if table contains the created entry', () => {
            const rows = this.Entry.getTableRows();
            rows.should('have.length', 1);
            this.Entry.getSpanByName(firstValue).should('exist');
            this.Entry.getSpanByName(secondValue).should('exist');
          });

          it('Validate ListView', () => {
            this.Entry.validateListView({ 'en-US': firstValue });
          });
        });

        describe('Should validate entry detail', () => {
          it('Open first entry', () => {
            this.Entry.openEntryDetail(0);
          });

          it('Validate Entry', () => {
            this.Entry.getSpanByName(firstValue).should('exist');
            this.Entry.getSpanByName(secondValue).should('exist');
          });

          it('Open Edit Screen', () => {
            this.Entry.openEditPage();
          });
        });

        describe('Should Edit Field', () => {
          const newValue = `${firstField.config.value} v2`;
          this.Entry.validateEntry({
            ...firstField,
            config: {
              ...firstField.config,
              value: newValue
            }
          });

          it('Submit', () => {
            this.Entry.submit();
          });

          it('Verify if value changed', () => {
            this.Entry.getSpanByName(newValue).should('exist');
          });

          it('Back to List Entries', () => {
            this.Entry.goBackApplicationBar();
            this.Entry.getSpanByName(newValue).should('exist');
          });
        });
      });
    });
  }
}

new ViewEntryDetails().run();
