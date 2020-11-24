import { Config } from '../utils/interfaces';
import TestRunner from '../utils/TestRunner';
import { EntryDetailsConfig } from './fixtures';
/// <reference path="../../support/index.d.ts" />

class ViewEntryDetailsStandalone extends TestRunner {
  config: Config;
  selectors: any;

  constructor () {
    super({
      ...EntryDetailsConfig,
      app: { ...EntryDetailsConfig.app, config: { standalone: true } }
    });
    this.config = EntryDetailsConfig;
    this.selectors = {};
  }

  run () {
    describe('ViewEntryDetailsStandalone', () => {
      before(() => {
        this.teardown();
      });

      beforeEach(() => {
        this.preserve();
      });

      describe('Portal', () => {
        it('Sign In', () => {
          cy.login();
        });
      });

      describe('Object Page', () => {
        it('Visit App Builder Object', () => {
          this.Portal.openApplicationMenu();
          this.Object.visit();
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
        this.App.pipeline();
      });

      this.Entry.pipeline();

      describe('Cleanup', () => {
        it('Visit App Builder Object', () => {
          this.Portal.visit();
          this.Portal.openApplicationMenu();
          this.Object.visit();
        });

        it('Remove all objects', () => {
          cy.wait(this.defaultTime);
          this.Object.deleteAllObjects();
        });
      });
    });
  }
}

new ViewEntryDetailsStandalone().run();
