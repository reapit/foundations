import { MouseEvent } from 'react'
import { NavigateFunction } from 'react-router'

export enum ExternalPages {
  platformAPIDocs = 'https://foundations-documentation.reapit.cloud/api/api-documentation',
  glossaryDocs = 'https://foundations-documentation.reapit.cloud/platform-glossary',
  graphQLDocs = 'https://foundations-documentation.reapit.cloud/app-development/graphql',
  baseDocs = 'https://foundations-documentation.reapit.cloud/',
  github = 'https://github.com/reapit/foundations',
  elementsDocs = 'https://foundations-documentation.reapit.cloud/app-development/elements',
  developerPortalDocs = 'https://foundations-documentation.reapit.cloud/developer-portal',
  webhooksDocs = 'https://foundations-documentation.reapit.cloud/api/webhooks',
  inviteMembersDocs = 'https://foundations-documentation.reapit.cloud/faqs#how-to-invite-new-members',
  desktopDocs = 'https://foundations-documentation.reapit.cloud/api/desktop-api',
  clientCredentials = 'https://foundations-documentation.reapit.cloud/api/api-documentation#client-credentials-flow',
  reapitConnectDocs = 'https://foundations-documentation.reapit.cloud/api/reapit-connect',
  loginWithReapitDocs = 'https://foundations-documentation.reapit.cloud/app-development/web',
  authoizationFlowDocs = 'https://foundations-documentation.reapit.cloud/api/reapit-connect#authentication-flow',
  connectSessionDocs = 'https://foundations-documentation.reapit.cloud/app-development/connect-session',
  craDocs = 'https://foundations-documentation.reapit.cloud/app-development/create-react-app-template',
  connectSessionNodeExample = 'https://github.com/reapit/foundations/blob/master/packages/connect-session/src/server/index.ts',
  installationsTableDocs = 'https://foundations-documentation.reapit.cloud/faqs#installations-table',
  listingAppDocs = 'https://foundations-documentation.reapit.cloud/listing-your-app',
  reviewingAppDocs = 'https://foundations-documentation.reapit.cloud/listing-your-app/app-listing-review',
  appApprovalDocs = 'https://foundations-documentation.reapit.cloud/faqs#app-approvals',
  acLaunchableDocs = 'https://foundations-documentation.reapit.cloud/listing-your-app#apps-launchable-inside-of-agencycloud',
  customerIdFindDocs = 'https://foundations-documentation.reapit.cloud/faqs#how-do-i-find-a-customer-id',
  pipelineDocs = 'https://foundations-documentation.reapit.cloud/app-development/iaas-coming-soon/developer-portal-beta',
  cliDocs = 'https://foundations-documentation.reapit.cloud/app-development/iaas-coming-soon/cli-beta',
  iaasDocs = 'https://foundations-documentation.reapit.cloud/app-development/iaas-coming-soon',
  codeExampleNodeWebsite = 'https://github.com/reapit/foundations-code-examples/tree/main/node-website-feed',
  codeExamplePHPWebsite = 'https://github.com/reapit/foundations-code-examples/tree/main/php-website-feed',
  codeExampleNetWebsite = 'https://github.com/reapit/foundations-code-examples/tree/main/dotnet-website-feed',
  iaasBugs = 'https://github.com/reapit/foundations/issues/new?assignees=&labels=bug%2C+needs-triage%2C+iaas%2C+front-end&template=bug_report.md&title=',
  appPermissionsDocs = 'https://foundations-documentation.reapit.cloud/listing-your-app/app-permissions',
}

export const openNewPage = (uri: ExternalPages | string) => (event?: MouseEvent) => {
  event?.preventDefault()
  event?.stopPropagation()
  window.open(uri, '_blank')
}

export const navigateRoute =
  (navigate: NavigateFunction, route: string) =>
  (event?: MouseEvent): void => {
    event?.stopPropagation()
    navigate(route)
    // GQL playground unsets the page title - need to reset this to the correct value
    if (document.title !== 'Developers') {
      document.title = 'Developers'
    }
  }
