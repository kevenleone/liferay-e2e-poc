import TestBase from '../utils/TestBase';

interface ComposeFields {
  addField: boolean;
  doAction: boolean;
  fatherSelector?: string;
  languageId?: string;
}

export default class FormView extends TestBase {
  private selectors: any;

  constructor () {
    super();
    this.selectors = {
      ddmDisplayStyle: '[data-field-name="displayStyle"]',
      ddmInline: '[data-field-name="inline"]',
      ddmLabel: '[data-field-name="label"]',
      ddmMultiple: '[data-field-name="multiple"]',
      ddmName: '[data-field-name="name"]',
      ddmOptions: '[data-field-name="options"]',
      ddmPlaceholder: '[data-field-name="placeholder"]',
      ddmPredefinedValue: '[data-field-name="predefinedValue"]',
      ddmRepeatable: '[data-field-name="repeatable"]',
      ddmRequired: '[data-field-name="required"]',
      ddmShowAsSwitcher: '[data-field-name="showAsSwitcher"]',
      ddmShowLabel: '[data-field-name="showLabel"]',
      ddmTip: '[data-field-name="tip"]',
      ddmTooltip: '[data-field-name="tooltip"]',
      ddmVisibilityExpression: '[data-field-name="visibilityExpression"]',
      instanceLanguageSelect:
        // eslint-disable-next-line max-len
        '#_com_liferay_configuration_admin_web_portlet_InstanceSettingsPortlet_languageId',
      newItem: '.nav-item button.btn-primary',
      primaryButton: 'button.btn.btn-primary'
    };
  }

  public composeFields (
    fieldTypes: Array<any>,
    {
      addField = true,
      fatherSelector = '',
      languageId = 'en_US'
    }: ComposeFields
  ): void {
    fieldTypes
      .filter(({ type }) => type)
      .map((field) => {
        describe(`Should handle ${field.name} Field and Fill Values`, () => {
          this.fieldCompose(field, {
            addField,
            doAction: true,
            fatherSelector,
            languageId
          });

          it('Dispose', () => {
            cy.get(`${fatherSelector} .sidebar-header button`).eq(0).click();
          });
        });
      });
  }

  private fieldCompose (
    field,
    { addField, doAction, fatherSelector, languageId }
  ) {
    const { type } = field;
    const localizedConfig = this.getLocalizedConfig(field.config, languageId);
    const {
      dragType = 'dbClick',
      displayType,
      help,
      inline,
      label,
      multiple,
      options = [],
      placeholder,
      predefinedValue,
      predefinedOptions,
      repeatable,
      required,
      showAsSwitcher,
      showLabel = true
    } = localizedConfig;

    const {
      ddmDisplayStyle,
      ddmInline,
      ddmLabel,
      ddmMultiple,
      ddmOptions,
      ddmPlaceholder,
      ddmPredefinedValue,
      ddmRepeatable,
      ddmRequired,
      ddmShowAsSwitcher,
      ddmShowLabel,
      ddmTip
    } = this.selectors;

    const withAdvancedField =
      predefinedValue || showLabel || repeatable || inline || predefinedOptions;

    it('Log myself', () => {
      cy.log(localizedConfig);
    });

    if (addField) {
      const fieldSelector = `[data-field-type-name="${type}"]`;
      if (dragType === 'dbClick') {
        it('Should add field on DataLayout using [dbClick]', () => {
          cy.get(fieldSelector).dblclick();
        });
      } else {
        it('Should add field on DataLayout using [drag-and-drop]', () => {
          if (dragType === 'dragTop') {
            cy.get('.ddm-target').first().as('target');
          } else {
            cy.get('.ddm-target').last().as('target');
          }
          cy.get(fieldSelector).drag('@target');
        });
      }
    } else {
      it('Click on Field on Layout', () => {
        cy.get(
          `.ddm-form-builder-wrapper [data-field-name="${field.config.id}"]`
        )
          .eq(0)
          .click();
      });
    }

    const applySelector = (selector) => {
      return fatherSelector ? `${fatherSelector} ${selector}` : selector;
    };

    const changeTab = (index) => {
      it('Changing tab', () => {
        cy.get('.component-tbar.ddm-form-tabs.tbar li').eq(index).click();
      });
    };

    const setInputValue = (selector, value, id) => {
      it(`Typing [${value}] on [${id}]`, () => {
        cy.get(`${applySelector(selector)} input`)
          .eq(0)
          .clear()
          .should('not.have.value')
          .type(value)
          .should('have.value', value);
      });
    };

    const setChecked = (selector, id) => {
      if (doAction) {
        it(`Mark [${id}] as [checked]`, () => {
          cy.get(`${applySelector(selector)} input`)
            .should('not.be.checked')
            .check()
            .should('be.checked');
        });
      }
    };

    const setUnchecked = (selector, id) => {
      if (doAction) {
        it(`Mark [${id}] as [unchecked]`, () => {
          cy.get(`${applySelector(selector)} input`)
            .should('be.checked')
            .uncheck()
            .should('not.be.checked');
        });
      }
    };

    if (label) {
      it(`Typing [${label}] on [Label]`, () => {
        cy.get(`${ddmLabel} input.ddm-field-text`)
          .clear()
          .type(label)
          .should('have.value', label);
      });
    }

    if (placeholder) {
      setInputValue(ddmPlaceholder, placeholder, 'placeholder');
    }

    if (help) {
      setInputValue(ddmTip, help, 'help');
    }

    if (doAction && displayType === 'multiple') {
      it('Marking [multiple] as [checked]', () => {
        cy.get(`${ddmDisplayStyle}`).within(() => {
          cy.get('input')
            .eq(1)
            .should('not.be.checked')
            .click()
            .should('be.checked');
        });
      });
    }

    if (options && options.length) {
      it('Typing [options]', () => {
        cy.get(ddmOptions).within(() => {
          cy.get('.ddm-field-options').should(
            'have.length',
            addField ? 2 : options.length + 1
          );
          options.forEach((option, index) => {
            cy.get('.ddm-field-options')
              .eq(index)
              .find('.form-group input')
              .eq(0)
              .clear()
              .type(option);
          });
        });
      });
    }

    if (required) {
      setChecked(ddmRequired, 'required');
    }

    if (showAsSwitcher) {
      setChecked(ddmShowAsSwitcher, 'showAsSwitcher');
    }

    if (withAdvancedField) {
      changeTab(1);

      it('Get the Name', () => {
        cy.get(`${this.selectors.ddmName} input`).then((doc) => {
          field.config.id = doc.val();
        });
      });

      if (predefinedValue) {
        setInputValue(ddmPredefinedValue, predefinedValue, 'predefinedValue');
      }

      if (repeatable) {
        setChecked(ddmRepeatable, 'repeatable');
      }

      if (!showLabel) {
        setUnchecked(ddmShowLabel, 'showLabel');
      }

      if (multiple) {
        setChecked(ddmMultiple, 'multiple');
      }

      if (inline) {
        setChecked(ddmInline, 'inline');
      }

      if (predefinedOptions) {
        it(`Select the [predefinedValue] as ${predefinedOptions}`, () => {
          cy.get(`${ddmPredefinedValue} .select-field-trigger`).click();
          cy.get(
            `.dropdown-menu.show button[label="${predefinedOptions}"]`
          ).click();
        });
      }
    }
  }

  public submit (): void {
    cy.get('.app-builder-upper-toolbar button.btn-primary').click();
  }

  public setTitle (value: string): void {
    cy.get('.app-builder-root').within(() => {
      cy.get('.tbar-item.tbar-item-expand input').type(value);
    });
  }
}
