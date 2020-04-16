const apiEndPoint = Cypress.env('marketplaceApiUrl')

export default {
  categories: `${apiEndPoint}/categories`,
  scopes: `${apiEndPoint}/scopes`,
  appsOfDeveloper: `${apiEndPoint}/apps?developerId=**&PageNumber=**&PageSize=**`,
  apps: `${apiEndPoint}/apps`,
  clientApps: `${apiEndPoint}/apps?clientId=**&PageNumber=**&PageSize=**&IsFeatured=true`,
  developerApps: `${apiEndPoint}/apps?developerId=**`,
  approvals: `${apiEndPoint}/approvals`,
  appDetail: `${apiEndPoint}/apps/**?clientId=**`,
  installedApps: `${apiEndPoint}/apps?clientId=*&OnlyInstalled=*&PageNumber=*&PageSize=*&IsDirectApi=*`,
  manageApps: `${apiEndPoint}/apps?clientId=**&OnlyInstalled=**&PageNumber=**&PageSize=**`,
  developers: `${apiEndPoint}/developers`,
  approveApp: `${apiEndPoint}/apps/**/revisions/**/approve`,
  revision: `${apiEndPoint}/apps/**/revisions`,
  installations: `${apiEndPoint}/installations`,
  terminateApp: `${apiEndPoint}/installations/**/terminate`,
  auth: 'https://cognito-idp.eu-west-2.amazonaws.com/',
}
