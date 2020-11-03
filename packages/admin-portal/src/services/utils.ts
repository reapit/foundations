import { StringMap } from '@/types/core'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const generateHeaders = async () => {
  const session = await reapitConnectBrowserSession.connectSession()
  if (session && session.accessToken) {
    return {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    } as StringMap
  }

  throw new Error('User session not available')
}
