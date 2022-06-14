const Routes = {
  AUTHENTICATION: '/authentication',
  ACCEPT_PERMISSION_CHANGE: '/apps/:appId/revisions/:revisionId/consents/:consentId/approve',
  APPS: '/apps',
  APP_DETAIL: '/apps/:appid',
  INSTALLED_APPS: '/installed',
  MY_APPS: '/manage',
  MY_APPS_PAGINATE: '/manage/:page',
  APP_DETAIL_MANAGE: '/apps/:appid/manage',
  SETTINGS: '/settings',
  HELP: '/help',
  LOGIN: '/login',
  REGISTER: '/register',
  FOUR_O_FOUR: '/404',
  OK: '/ok',
}

export const developerRoutes = {
  DEV: 'https://developers.dev.paas.reapit.cloud',
  PROD: 'https://developers.reapit.cloud',
  DESKTOP: '/desktop',
}

export default Routes
