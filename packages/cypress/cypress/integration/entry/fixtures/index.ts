import * as faker from 'faker';

export const EntryDetailsConfig = {
  app: {
    config: { product: true, standalone: true, widget: false },
    name: {
      'en-US': `My App ${faker.random.number()}`
    }
  },
  formView: {
    fieldTypes: [
      {
        config: {
          label: { 'en-US': 'Full Name', 'pt-BR': 'Nome Completo' },
          repeatable: false,
          required: false,
          showLabel: true,
          value: `${faker.name.firstName()} ${faker.name.lastName()}`
        },
        name: 'Text',
        type: 'text'
      },
      {
        config: {
          dragType: 'dragBottom',
          label: { 'en-US': 'Nickname', 'pt-BR': 'Apelido' },
          repeatable: false,
          required: true,
          showLabel: true,
          value: faker.internet.userName()
        },
        name: 'Text',
        type: 'text'
      }
    ],
    name: { 'en-US': 'My Registration Form' }
  },
  object: { name: `Liferay Object ${faker.random.number()}` },
  tableView: {
    name: {
      'en-US': 'My Registration Table'
    },
    selectedFields: [
      { label: 'Full Name', value: 'Full Name' },
      { label: 'Departament', value: 'Departament' }
    ]
  }
};
