const Routes = {
  AUTHENTICATION: '/authentication',
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
}

export const developerRoutes = {
  DEV: 'https://dev.developers.reapit.cloud',
  PROD: 'https://developers.reapit.cloud',
  DESKTOP: '/desktop',
}

export default Routes
