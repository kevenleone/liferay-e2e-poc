import { Config } from '../utils/interfaces';
import TestRunner from '../utils/TestRunner';
import { EntryDetailsConfig } from './fixtures';
/// <reference path="../../support/index.d.ts" />

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
      });

      describe('Object Page', () => {
        it('Visit App Builder Object', () => {
          this.Portal.openApplicationMenu();

          this.Object.visit();
        });

        it('Delete all existing Objects', () => {
          this.Object.deleteAllObjects();
        });

        it('Create an Object', () => {
          this.Object.createAnObject(this.config.object.name);
        });
      });

      describe('FormView Page', () => {
        this.FormView.composeFields(this.config.formView.fieldTypes, {
          addField: true,
          doAction: true
        });

        describe('Save it', () => {
          it('Set title', () => {
            this.FormView.setTitle(this.config.formView.name['en-US']);
          });

          it('Save', () => {
            this.FormView.submit();
          });
        });
      });

      describe('TableView Page', () => {
        this.TableView.pipeline();
      });

      describe('App Page', () => {
        this.App.pipeline(false);
      });

      describe('Application Page', () => {
        after(() => {
          this.Entry.deleteAllEntries();
          this.Entry.emptyState();
        });

        describe('Should Open Application and Application', () => {
          it('Go to home', () => {
            this.Portal.visit();
          });

          it('Open Menu', () => {
            this.Portal.openApplicationMenu();
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

        this.Entry.entryCrud();
      });
    });
  }
}

new ViewEntryDetails().run();
