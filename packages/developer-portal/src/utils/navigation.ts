import { History } from 'history'

export enum ExternalPages {
  platformAPIDocs = 'https://foundations-documentation.reapit.cloud/api/api-documentation',
  glossaryDocs = 'https://foundations-documentation.reapit.cloud/platform-glossary',
  graphQLDocs = 'https://foundations-documentation.reapit.cloud/app-development/graphql',
  baseDocs = 'https://foundations-documentation.reapit.cloud/',
  github = 'https://github.com/reapit/foundations',
  elementsDocs = 'https://foundations-documentation.reapit.cloud/app-development/elements',
}

export const openNewPage = (uri: ExternalPages | string) => () => {
  window.open(uri, '_blank')
}

export const navigate = (history: History, route: string) => (): void => {
  history.push(route)
}
