declare global {
  interface Window {}
}

export {}

declare global {
  interface Window {}

  namespace NodeJS {
    interface ProcessEnv {
      appEnv: 'local' | 'development' | 'production'
      sentryDsn: string
      mixPanelToken: string
      connectClientId: string
      connectOAuthUrl: string
      connectUserPoolId: string
      developerPortalUrl: string
      orgAdminRestrictedAppIds: string[]
      reapitConnectManagementUri: string
      clientHiddenAppIds: {
        [key: string]: string[]
      }
    }
  }
}
