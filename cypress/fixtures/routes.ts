const apiEndPoint = Cypress.env('MARKETPLACE_API_BASE_URL')

export default {
  categories: `${apiEndPoint}/categories`,
  scopes: `${apiEndPoint}/scopes`,
  appsOfDeveloper: `${apiEndPoint}/apps?developerId=**&PageNumber=**&PageSize=**`,
  apps: `${apiEndPoint}/apps`,
  approvals: `${apiEndPoint}/approvals`,
  appDetail: `${apiEndPoint}/apps/**?clientId=**`,
  installedApps: `${apiEndPoint}/apps?clientId=**&OnlyInstalled=**&PageNumber=**&PageSize=**&IsDirectApi=**`,
  manageApps: `${apiEndPoint}/apps?clientId=**&OnlyInstalled=**&PageNumber=**&PageSize=**`,
  developers: `${apiEndPoint}/developers`,
  approveApp: `${apiEndPoint}/apps/**/revisions/**/approve`,
  revision: `${apiEndPoint}/apps/**/revisions`,
  changePassword: `${apiEndPoint}/password/change`,
  installations: `${apiEndPoint}/installations`,
  terminateApp: `${apiEndPoint}/installations/**/terminate`
}
