import Routes from '../../../../constants/routes'

export const getCurrentPage = (pathname: string) => {
  const isAppsList = pathname === Routes.APPS
  const isAppsNew = pathname === Routes.APPS_NEW
  const isAppsWelcome = pathname === Routes.APPS_WELCOME
  const isAppsInstallations = /^\/apps\/[a-z0-9-]+\/installations/.test(pathname)
  const isAppsEdit = /^\/apps\/[a-z0-9-]+\/edit/.test(pathname)
  const isAppsDetail = /^\/apps\/[a-z0-9-]+/.test(pathname) && !isAppsEdit && !isAppsNew && !isAppsInstallations

  return {
    isAppsList,
    isAppsNew,
    isAppsWelcome,
    isAppsEdit,
    isAppsDetail,
    isAppsInstallations,
  }
}
