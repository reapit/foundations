import ReapitConnectButtonComponent from './reapit-connect-component.svelte'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export interface ReapitConnectInitializers {
  connectClientId: string
  connectOAuthUrl: string
  connectLoginRedirectPath: string
  connectLogoutRedirectPath: string
  connectContainerId: string
  connectHasSessionCallback: (session: ReapitConnectBrowserSession) => any
}

export const ReapitConnectComponent = ({
  connectClientId,
  connectOAuthUrl,
  connectLoginRedirectPath,
  connectLogoutRedirectPath,
  connectContainerId,
  connectHasSessionCallback,
}: ReapitConnectInitializers) => {
  const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
    connectClientId,
    connectOAuthUrl,
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
