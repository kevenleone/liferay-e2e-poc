/// <reference types="cypress" />

import { Config } from '../utils/interfaces';
import TestBase from '../utils/TestBase';

export default class Entry extends TestBase {
  private selectors: any;
  private config: Config;

  constructor (config: Config) {
    super();
    this.config = config;
    this.selectors = {
      dropDownAction: '.dropdown-action',
      editIcon: '.lexicon-icon-pencil',
      newItem: '.nav-item button.btn-primary',
      submitForm: '.app-builder-form-buttons .btn-primary',
      tableRows: 'tbody tr'
    };
  }

  public getFieldByLabel (fieldName: string): Cypress.Chainable {
    return cy.xpath(`//label[contains(text(), '${fieldName}')]`).parent();
  }

  public getSpanByName (name: string): Cypress.Chainable {
    return cy.xpath(`//span[contains(text(), '${name}')]`);
  }

  public openEditPage (): void {
    cy.get(this.selectors.editIcon).parent().click();
  }

  public fillForm (): void {
    this.config.formView.fieldTypes
      .filter(({ config }) => config)
      .forEach((fieldType) => {
        const fieldName = this.getLocalizedValue(fieldType.config.label);
        describe(`Should validate all fields of ${fieldName}`, () => {
          this.validateEntry(fieldType, this.getLanguageId());
        });
      });
  }

  public addEntry (): void {
    cy.get(this.selectors.newItem).click();
  }

  public openEntryDetail (entryIndex: number): void {
    const { dropDownAction, tableRows } = this.selectors;
    cy.get(tableRows)
      .eq(entryIndex)
      .within(() => {
        cy.get(dropDownAction).click();
      });

    cy.get('.dropdown-menu.show').within(() => {
      cy.get('button').first().click();
    });
  }

  public deleteAllEntries (): void {
    cy.get('tbody tr').each(() => {
      cy.wait(this.defaultTime);
      cy.get('tbody tr:nth-child(1) .dropdown-action').click();
      cy.get('.dropdown-menu.show').within(() => {
        cy.get('button').last().click();
      });
    });
  }

  public submit (): void {
    cy.get(this.selectors.submitForm)
      .should('be.enabled')
      .click()
      .should('be.disabled');
  }

  public validateEntry (
    fieldType: any,
    languageId?: string
  ): void {
    const {
      help,
      label,
      options,
      placeholder,
      predefinedOption,
      predefinedValue,
      repeatable,
      required,
      showLabel = true,
      value
    } = this.getLocalizedConfig(fieldType.config, languageId);

    const fieldName = this.getLocalizedValue(fieldType.config.label);

    beforeEach(() => {
      this.getFieldByLabel(fieldName).as('field');
    });

    if (showLabel) {
      it('Field [Label] should be present', () => {
        cy.get('@field').find('.ddm-label').contains(label);
      });
    }

    if (required) {
      it('Field [Required] should be present', () => {
        cy.get('@field').find('.reference-mark').should('exist');
      });
    }

    if (repeatable) {
      it('Field [Repeatable] should be present', () => {
        cy.get('@field')
          .find('.ddm-form-field-repeatable-add-button')
          .should('be.enabled')
          .should('be.visible');
      });
    }

    if (help) {
      it('[Help] text should be present', () => {
        cy.get('@field').find('span').contains(help);
      });
    }

    if (placeholder) {
      it('Field Placeholder should be present', () => {
        cy.get('@field')
          .find(`[placeholder="${placeholder}"]`)
          .as('placeholder');
        if (predefinedValue) {
          cy.get('@placeholder').should('have.value', predefinedValue);
        }
      });
    }

    if (required) {
      it('Try to submit a form without filling required field', () => {
        if (predefinedValue) {
          cy.get('@field')
            .find('.form-control[type="text"]')
            .as('input')
            .clear();
          cy.get('@field')
            .find('.form-feedback-item')
            .as('feedback')
            .should('be.visible');
          this.submit();
          cy.get('@input')
            .type(predefinedValue)
            .should('have.value', predefinedValue);
          cy.get('@feedback').should('not.exist');
        }
      });
    }

    if (repeatable) {
      xit('Add Repeatable Field', () => {
        cy.get('@field').find('.ddm-form-field-repeatable-add-button').click();
      });
    }

    const notInputFieldTypes = ['radio', 'select', 'checkbox_multiple'];

    if (!notInputFieldTypes.includes(fieldType.type)) {
      const newValue = value || this.getFakeValueByType(fieldType.type);

      it(`Typing [${newValue}] value`, () => {
        if (fieldType.type === 'date') {
          const date = new Date(2019, 2, 10);
          cy.get('@field').find('.date-picker-dropdown-toggle').click();
          cy.get('.date-picker-dropdown-menu.show').within(() => {
            cy.get('select[name="month"]').select(date.getMonth().toString());
            cy.get('select[name="year"]').select(date.getFullYear().toString());
            cy.get('button').contains(date.getDate().toString()).click();
          });
        } else {
          cy.get('@field')
            .find('input[type="text"]')
            .type(newValue as string);
        }
      });
    } else {
      it('Choosing an option', () => {
        if (fieldType.type === 'select') {
          cy.get('@field').find('.select-field-trigger').click();
          this.chooseAnOption(predefinedOption || value || options[1]);
        }
      });
    }
  }

  pipeline (): void {
    describe('Validate Standalone Home Screen', () => {
      const appName = this.getLocalizedValue(this.config.app.name);
      const locale = this.getLanguageId().toLowerCase();

      it(`Should have [${appName}] on Standalone name`, () => {
        cy.get('.app-builder-standalone-name').contains(appName);
      });

      it('Should have empty state', () => {
        this.emptyState();
      });

      it(`Translation Manager should have default value as [${locale}]`, () => {
        cy.get('.app-builder-standalone-translation-manager svg').should(
          'have.class',
          `lexicon-icon lexicon-icon-${locale.toLowerCase()}`
        );
      });

      it('Should open Add Entry Page', () => {
        cy.get(this.selectors.newItem).click();
      });
    });

    this.fillForm();

    describe('Submit Entries', () => {
      it('Should submit entry', () => {
        this.submit();
      });
    });

    describe('Validate Standalone Home Screen', () => {
      it('Table Values are fine', () => {
        // this.validateListView()
      });
    });
  }
}
