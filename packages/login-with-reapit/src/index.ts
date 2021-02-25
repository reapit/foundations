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
}

export const ReapitConnectComponent = ({
  connectClientId,
  connectOAuthUrl,
  connectUserPoolId,
  connectLoginRedirectPath,
  connectLogoutRedirectPath,
  connectContainerId,
  connectHasSessionCallback,
}: ReapitConnectInitializers) => {
  const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
    connectClientId,
    connectOAuthUrl,
    connectUserPoolId,
    connectLoginRedirectPath,
    connectLogoutRedirectPath,
  })

  return new ReapitConnectButtonComponent({
    target: document.querySelector(connectContainerId) || document.body,
    props: {
      reapitConnectBrowserSession,
      connectHasSessionCallback,
    },
  })
}

Object.defineProperty(window, 'ReapitConnectComponent', {
  value: ReapitConnectComponent,
})
