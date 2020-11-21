const portalURL = 'http://10.0.0.103:8080';
const defaultLanguageId = 'en_US';

const languages = {
  ar_SA: { key: 'ar_SA', value: 'Arabic (Saudi Arabia)' },
  ca_ES: { key: 'ca_ES', value: 'Catalan (Spain)' },
  de_DE: { key: 'de_DE', value: 'German (Germany)' },
  en_US: { key: 'en_US', value: 'English (United States' },
  es_ES: { key: 'es_ES', value: 'Spanish (Spain)' },
  fi_FI: { key: 'fi_FI', value: 'Finnish (Finland)' },
  fr_FR: { key: 'fr_FR', value: 'French (France)' },
  hu_HU: { key: 'hu_HU', value: 'Hungarian (Hungary)' },
  ja_JP: { key: 'ja_JP', value: 'Japanese (Japan)' },
  nl_NL: { key: 'nl_NL', value: 'Dutch (Netherlands)' },
  pt_BR: { key: 'pt_BR', value: 'Portuguese (Brazil)' },
  sv_SE: { key: 'sv_SE', value: 'Swedish (Sweden)' },
  zh_CN: { key: 'zh_CN', value: 'Chinese (China)' }
};

module.exports = {
  buttons: [
    'Desktop',
    'Tablet',
    'Mobile',
    'AutoSize',
    'Custom'
  ],
  credentials: {
    email: 'test@liferay.com',
    login: 'test',
    password: 'test'
  },
  defaultLanguageId,
  languageId: defaultLanguageId.replace('_', '-'),
  languages,
  modules: {
    accountSettings: `${portalURL}/group/control_panel/manage?p_p_id=com_liferay_my_account_web_portlet_MyAccountPortlet&p_p_lifecycle=0&p_p_auth=68JLVPmH`,
    instance: `${portalURL}/group/control_panel/manage?p_p_id=com_liferay_configuration_admin_web_portlet_InstanceSettingsPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&_com_liferay_configuration_admin_web_portlet_InstanceSettingsPortlet_mvcRenderCommandName=%2Fview_configuration_screen&_com_liferay_configuration_admin_web_portlet_InstanceSettingsPortlet_configurationScreenKey=language`,
    object: `${portalURL}/group/guest/~/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ObjectsPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&p_p_auth=cIaiVlKB%2F#/`
  },
  portalHome: {
    footer: 'Powered By',
    helloWorld: 'Hello World',
    title: 'Home - Liferay',
    welcome: 'Welcome to Liferay Community'
  },
  portalURL,
  preserve: () => {
    Cypress.Cookies.defaults({
      preserve: [
        'JSESSIONID',
        'LFR_SESSION_STATE_20126',
        'SCREEN_NAME',
        'COMPANY_ID',
        'GUEST_LANGUAGE_ID',
        'LFR_SESSION_STATE_20103',
        'COOKIE_SUPPORT'
      ]
    });
  },
  simulator: {
    defaultValue: '600',
    height: '768',
    width: '1024'
  }
};
