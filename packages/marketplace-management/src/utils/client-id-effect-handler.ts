import { Dispatch, SetStateAction } from 'react'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const clientIdEffectHandler = (
  clientId: string | null,
  setClientId: Dispatch<SetStateAction<string | null>>,
) => () => {
  const getClientId = async () => {
    const session = await reapitConnectBrowserSession.connectSession()
    if (!session) throw new Error('No Reapit Connect Session is present')

    setClientId(session.loginIdentity.clientId)
  }

  if (!clientId) {
    getClientId()
  }
}
