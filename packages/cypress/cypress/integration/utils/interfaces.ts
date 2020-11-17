interface LocalizableValue {
    'en-US'?: string;
    'ar-SA'?: string;
    'ca-ES'?: string;
    'zh-CN'?: string;
    'nl-NL'?: string;
    'fi-FI'?: string;
    'fr-FR'?: string;
    'de-DE'?: string;
    'hu-HU'?: string;
    'ja-JP'?: string;
    'pt-BR'?: string;
    'es-ES'?: string;
    'sv-SE'?: string;
};

interface Localizable {
    name: LocalizableValue
}

interface SelectedFields {
    label: string;
    value: string;
}

interface App {
    name: LocalizableValue;
    config: {
        product?: boolean;
        standalone?: boolean;
        widget?: boolean;
    }
}

interface FormView extends Localizable {
    fieldTypes: Array<any>
}

interface TableView extends Localizable {
    selectedFields: SelectedFields[]
}

type IObject = Localizable

interface Config {
    app: App;
    formView: FormView;
    tableView: TableView;
    object: IObject
}

export { Config };
