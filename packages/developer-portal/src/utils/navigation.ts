import { History } from 'history'
import { MouseEvent } from 'react'

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
}

export const openNewPage = (uri: ExternalPages | string) => () => {
  window.open(uri, '_blank')
}

export const navigate =
  (history: History, route: string) =>
  (event?: MouseEvent): void => {
    event?.stopPropagation()
    history.push(route)
    // GQL playground unsets the page title - need to reset this to the correct value
    if (document.title !== 'Developers') {
      document.title = 'Developers'
    }
  }
