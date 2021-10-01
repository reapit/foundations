import ReapitConnectButtonComponent from './components/reapit-connect-component.svelte'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export interface ReapitConnectInitializers {
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  connectLoginRedirectPath: string
  connectLogoutRedirectPath: string
  connectContainerId: string
  connectHasSessionCallback: (session: ReapitConnectBrowserSession) => any
  companyName: string
}

export const reapitConnectComponent = ({
  connectClientId,
  connectOAuthUrl,
  connectUserPoolId,
  connectLoginRedirectPath,
  connectLogoutRedirectPath,
  connectContainerId,
  connectHasSessionCallback,
  companyName,
}: ReapitConnectInitializers) => {
  const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
    connectClientId,
    connectOAuthUrl,
    connectUserPoolId,
    connectLoginRedirectPath,
    connectLogoutRedirectPath,
  })

  new ReapitConnectButtonComponent({
    target: document.querySelector(connectContainerId) || document.body,
    props: {
      reapitConnectBrowserSession,
      connectHasSessionCallback,
      companyName,
    },
  })
}

Object.defineProperty(window, 'reapitConnectComponent', {
  value: reapitConnectComponent,
})
