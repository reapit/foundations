import { Dispatch, SetStateAction } from 'react'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const orgIdEffectHandler = (orgId: string | null, setOrgId: Dispatch<SetStateAction<string | null>>) => () => {
  const getOrgId = async () => {
    const session = await reapitConnectBrowserSession.connectSession()
    if (!session) throw new Error('No Reapit Connect Session is present')

    setOrgId(session.loginIdentity.orgId)
  }

  if (!orgId) {
    getOrgId()
  }
}
