import { History } from 'history'

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
}

export const openNewPage = (uri: ExternalPages | string) => () => {
  window.open(uri, '_blank')
}

export const navigate = (history: History, route: string) => (): void => {
  history.push(route)
  // GQL playground unsets the page title - need to reset this to the correct value
  if (document.title !== 'Developers') {
    document.title = 'Developers'
  }
}
