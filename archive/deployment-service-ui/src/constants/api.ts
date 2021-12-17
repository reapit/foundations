export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'api-version': '2020-01-31',
}

export const URLS: { [s: string]: string } = {
  API_KEY_SERVICE_HOST: window.reapit.config.API_KEY_SERVICE_HOST,
  DEPLOYMENT_SERVICE_HOST: window.reapit.config.DEPLOYMENT_SERVICE_HOST,
}
