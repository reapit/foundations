const CONSTANTS: { [key: string]: { [key: string]: string } } = {
  LOCAL: {
    WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET: 'http://localhost:3000',
  },
  DEV: {
    WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET: 'http://localhost:3000',
  },
  PROD: {
    WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET: 'http://localhost:3000',
  },
}

export const API_BASE_URL = CONSTANTS[process.env.REAPIT_ENV || 'LOCAL'].WEB_COMPONENT_API_BASE_URL_SEARCH_WIDGET

export default CONSTANTS
