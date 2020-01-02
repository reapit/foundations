const apiEndPoint = Cypress.env('MARKETPLACE_API_BASE_URL')

export default {
  categories: `${apiEndPoint}/categories`,
  scopes: `${apiEndPoint}/scopes`,
  appsOfDeveloper: `${apiEndPoint}/apps?developerId=**&PageNumber=**&PageSize=**`,
  apps: `${apiEndPoint}/apps`,
  developers: `${apiEndPoint}/developers`,
  approveApp: `${apiEndPoint}/apps/**/revisions/**/approve`,
  revision: `${apiEndPoint}/apps/**/revisions`
}
