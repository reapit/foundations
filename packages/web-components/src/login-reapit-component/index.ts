import ReapitConnectButtonComponent from './reapit-connect-component.svelte'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export interface ReapitConnectInitializers {
  connectClientId: string
  connectOAuthUrl: string
  connectLoginRedirectPath: string
  connectLogoutRedirectPath: string
  connectContainerId: string
}

export const ReapitConnectComponent = function({
  connectClientId,
  connectOAuthUrl,
  connectLoginRedirectPath,
  connectLogoutRedirectPath,
  connectContainerId,
}: ReapitConnectInitializers) {
  const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
    connectClientId,
    connectOAuthUrl,
    connectLoginRedirectPath,
    connectLogoutRedirectPath,
  })

  const component = new ReapitConnectButtonComponent({
    target: document.querySelector(connectContainerId) || document.body,
    props: {
      reapitConnectBrowserSession,
    },
  })

  component.reapitConnectBrowserSession = reapitConnectBrowserSession

  return component
}

Object.defineProperty(window, 'ReapitConnectComponent', {
  value: ReapitConnectComponent,
})
