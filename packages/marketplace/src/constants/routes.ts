const Routes = {
  AUTHENTICATION: '/authentication',
  AUTHENTICATION_LOGIN_TYPE: '/authentication/:loginType',
  APPS: '/apps',
  APP_DETAIL: '/apps/:appid',
  APP_DETAIL_MANAGE: '/apps/:appid/manage',
  WELCOME: '/welcome',
  INSTALLED_APPS: '/installed',
  INSTALLED_APPS_PAGINATE: '/installed/:page',
  MY_APPS: '/manage',
  MY_APPS_PAGINATE: '/manage/:page',
  SETTINGS: '/settings',
  HELP: '/help',
  LOGIN: '/login',
  FOUR_O_FOUR: '/404',
}

export const developerRoutes = {
  DEV: 'https://dev.developers.reapit.cloud',
  PROD: 'https://developers.reapit.cloud',
  DESKTOP: '/desktop',
}

export default Routes
