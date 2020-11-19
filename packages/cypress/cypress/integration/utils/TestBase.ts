import * as faker from 'faker';

import { CustomObjectTypes, LocalizableValue } from './interfaces';

export default class TestBase {
  private constants: any;
  protected faker: Faker.FakerStatic;
  protected defaultTime: number;

  constructor () {
    this.constants = {
      applicationMenuNav: '.control-menu-nav',
      iconLeftAngle: '.lexicon-icon-angle-left'
    };
    this.defaultTime = 1000;
    this.faker = faker;
  }

  changeObjectTab (index: CustomObjectTypes): void {
    cy.wait(this.defaultTime)
      .get('.custom-object-app .nav-item')
      .eq(index)
      .click();
  }

  chooseAnOption (value: string): void {
    cy.get('.dropdown-menu.show').within(() => {
      cy.get('button').contains(value).click();
    });
  }

  getFakeValueByType (type: string): string | number {
    switch (type) {
      case 'text': {
        return this.faker.system.fileName();
      }
      case 'date': {
        // return '19/02/1996'
        return this.faker.date.recent(3).toISOString();
      }
      case 'numeric': {
        return this.faker.random.number(120);
      }
      default: {
        return this.faker.address.city();
      }
    }
  }

  public getLocalizedPrefenceValue (
    name: LocalizableValue,
    defaultLanguageId = this.getDefaultLanguageId()
  ): string {
    if (name[defaultLanguageId]) {
      return name[defaultLanguageId];
    }
    return this.getLocalizedValue(name);
  }

  public getLanguageId (): string {
    return 'en-US';
  }

  public getDefaultLanguageId (): string {
    return 'en-US';
  }

  public getLocalizedValue (name: LocalizableValue, untitled = ''): string {
    return (
      name[this.getLanguageId()] ||
      name[this.getDefaultLanguageId()] ||
      untitled
    );
  }

  public getTableRows (): Cypress.Chainable {
    return cy.get('tbody>tr');
  }

  public goBackApplicationBar (): void {
    const { iconLeftAngle } = this.constants;
    cy.get(iconLeftAngle).first().parent().click();
  }

  public selectLanguage (lang: string, force = false): void {
    it('Select language', () => {
      cy.get('.app-builder-root').within(() => {
        cy.get('.localizable-dropdown button').click();
      });

      cy.get('.localizable-dropdown-ul')
        .find(`.lexicon-icon-${lang}`)
        .click({ force });
    });
  }

  public normalizeLang (lang: string): string {
    return lang.replace('_', '-').toLowerCase();
  }

  public emptyState (): void {
    cy.get('.taglib-empty-result-message').should('be.visible');
  }

  public getLocalizedConfig (
    config = {},
    lang = this.getDefaultLanguageId()
  ): any {
    const newConfigs = {
      ...config
    };
    Object.keys(config).forEach((key) => {
      const value = config[key];
      if (Array.isArray(value)) {
        newConfigs[key] = value.map((localizedValue) =>
          this.getLocalizedPrefenceValue(localizedValue, lang)
        );
      } else if (typeof value === 'object') {
        newConfigs[key] = this.getLocalizedPrefenceValue(value, lang);
      }
    });
    return newConfigs;
  }

  public managementTitle (name: LocalizableValue): void {
    const defaultLanguageId = this.getDefaultLanguageId();
    const normalizeLang = (lang) => lang.replace('_', '-').toLowerCase();
    const selectLanguage = (lang, force = false) => {
      cy.get('.app-builder-root').within(() => {
        cy.get('.localizable-dropdown button').click();
      });

      cy.get('.localizable-dropdown-ul')
        .find(`.lexicon-icon-${lang}`)
        .click({ force });
    };

    if (!name[defaultLanguageId]) {
      name[defaultLanguageId] = 'Untitled';
    }

    if (typeof name === 'object') {
      Object.keys(name).forEach((languageId) => {
        const value = name[languageId];
        const lang = normalizeLang(languageId);

        selectLanguage(lang);
        cy.get('.app-builder-root').within(() => {
          cy.get('.tbar-item.tbar-item-expand input').type(value);
        });
      });

      selectLanguage(normalizeLang(defaultLanguageId), true);
    }
  }

  public validateListView (name: LocalizableValue): void {
    const localizedValue = this.getLocalizedPrefenceValue(name);
    const fakeCompany = this.faker.company.companyName();

    cy.wait(this.defaultTime);

    cy.get('[placeholder="Search..."]')
      .eq(0)
      .should('not.have.value')
      .type(`${localizedValue}{enter}`)
      // .should('have.value', localizedValue)
      .as('input');

    cy.get('.tbar-section')
      .as('section')
      .should('be.visible')
      .contains(localizedValue);

    cy.get('tbody tr').should('have.length', 1).as('row');

    cy.get('@input').clear().type(`${fakeCompany} {enter}`);

    cy.get('@section').should('be.visible').contains(fakeCompany);

    this.emptyState();

    cy.get('@section').find('button').click({ force: true });
  }
}
