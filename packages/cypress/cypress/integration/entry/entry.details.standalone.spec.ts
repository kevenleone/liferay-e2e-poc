import { Config } from '../utils/interfaces';
import TestRunner from '../utils/TestRunner';
import { EntryDetailsConfig } from './fixtures';
/// <reference path="../../support/index.d.ts" />

class ViewEntryDetailsStandalone extends TestRunner {
  config: Config;
  selectors: any;

  constructor () {
    super(EntryDetailsConfig);
    this.config = EntryDetailsConfig;
    this.selectors = {};
  }

  run () {
    describe('ViewEntryDetailsStandalone', () => {
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
        this.App.pipeline();
      });

      this.Entry.pipeline();
    });
  }
}

new ViewEntryDetailsStandalone().run();
