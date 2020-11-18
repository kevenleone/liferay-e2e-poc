import * as faker from 'faker';

export const EntryDetailsConfig = {
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
          showLabel: true,
          value: faker.system.fileName()
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
          showLabel: true,
          value: 'Engineering'
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
