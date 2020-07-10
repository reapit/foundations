const Routes = {
  AUTHENTICATION: '/authentication',
  AUTHENTICATION_LOGIN_TYPE: '/authentication/:loginType',
  APPS: '/client/apps',
  APP_DETAIL: '/client/apps/:appid',
  APP_DETAIL_MANAGE: '/client/apps/:appid/manage',
  WELCOME: '/client/welcome',
  INSTALLED_APPS: '/client/installed',
  INSTALLED_APPS_PAGINATE: '/client/installed/:page',
  MY_APPS: '/client/manage',
  MY_APPS_PAGINATE: '/client/manage/:page',
  SETTINGS: '/client/settings',
  HELP: '/client/help',
  LOGIN: '/client/login',
  FOUR_O_FOUR: '/404',

  DEVELOPER_DESKTOP: '/developer/desktop',
  REGISTER: '/register',
}

export default Routes
