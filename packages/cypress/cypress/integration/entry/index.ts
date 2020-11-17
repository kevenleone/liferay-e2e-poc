import TestBase from '../utils/TestBase';

export default class Standalone extends TestBase {
  private selectors: any;
  constructor () {
    super();
    this.selectors = {};
  }

  _submit () {
    cy.get(`.app-builder-form-buttons ${this.selectors.primaryButton}`).click().wait(500);
  }

  _validateEntry (fieldType, languageId) {
    const {
      displayType,
      help,
      inline,
      label,
      multiple,
      options,
      placeholder,
      predefinedOption,
      predefinedValue,
      repeatable,
      required,
      showAsSwitcher,
      showLabel = true
    } = this.getLocalizedConfig(fieldType.config, languageId);

    beforeEach(() => {
      cy.get(`[data-field-name="${fieldType.config.id}"]`).as('field');
      // cy.get('.position-relative.row').eq(index + 1).as('field')
    });

    if (showLabel) {
      it('Field [Label] should be present', () => {
        cy.get('@field')
          .find('.ddm-label')
          .contains(label);
      });
    }

    if (required) {
      it('Field [Required] should be present', () => {
        cy.get('@field')
          .find('.reference-mark')
          .should('exist');
      });
    }

    if (repeatable) {
      it('Field [Repeatable] should be present', () => {
        cy
          .get('@field')
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
          cy
            .get('@field')
            .find('.form-control[type="text"]')
            .as('input')
            .clear();
          cy
            .get('@field')
            .find('.form-feedback-item')
            .as('feedback')
            .should('be.visible');
          this._submit();
          cy
            .get('@input')
            .type(predefinedValue)
            .should('have.value', predefinedValue);
          cy
            .get('@feedback')
            .should('not.exist');
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
      const value = this.getFakeValueByType(fieldType.type);

      it(`Typing [${value}] value`, () => {
        if (fieldType.type === 'date') {
          const date = new Date(2019, 2, 10);
          cy.get('@field').find('.date-picker-dropdown-toggle').click();
          cy.get('.date-picker-dropdown-menu.show').within(() => {
            cy.get('select[name="month"]').select(date.getMonth().toString());
            cy.get('select[name="year"]').select(date.getFullYear().toString());
            cy.get('button').contains(date.getDate().toString()).click();
          });
        } else {
          cy.get('@field').find('input[type="text"]').type(value);
        }
      });
    } else {
      it('Choosing an option', () => {
        if (fieldType.type === 'select') {
          cy.get('@field').find('.select-field-trigger').click();
          this.chooseAnOption(predefinedOption || options[1]);
        }
      });
    }
  }

  pipeline () {
    describe('Validate Standalone Home Screen', () => {
      const appName = this.getLocalizedValue(
        this.config.app.name
      );
      const locale = this.getLanguageId().toLowerCase();

      it(`Should have [${appName}] on Standalone name`, () => {
        cy.get('.app-builder-standalone-name').contains(appName);
      });

      it('Should have empty state', () => {
        this.emptyState();
      });

      it(`Translation Manager should have default value as [${locale}]`, () => {
        cy
          .get('.app-builder-standalone-translation-manager svg')
          .should('have.class', `lexicon-icon lexicon-icon-${locale.toLowerCase()}`);
      });

      it('Should open Add Entry Page', () => {
        cy.get(this.selectors.newItem).click();
      });
    });

    this.config.formView.fieldTypes.filter(({ config }) => config).forEach((fieldType) => {
      describe(`Should validate all fields of ${this.getLocalizedValue(fieldType.config.label)}`, () => {
        this._validateEntry(fieldType, this.getLanguageId());
      });
    });

    describe('Submit Entries', () => {
      it('Should submit entry', () => {
        this._submit();
      });
    });

    describe('Validate Standalone Home Screen', () => {
      it('Table Values are fine', () => {
        // this.validateListView()
      });
    });
  }
}
