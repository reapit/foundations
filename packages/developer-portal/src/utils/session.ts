import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession } from '@reapit/connect-session'

export const getAccessToken = async (): Promise<string | null> => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  return (connectSession && connectSession?.accessToken) || ''
}

export const getDeveloperIdFromConnectSession = (connectSession: ReapitConnectSession | null): string => {
  return (connectSession && connectSession?.loginIdentity?.developerId) || ''
}

export const getClientIdFromConnectSession = (connectSession: ReapitConnectSession | null): string => {
  return (connectSession && connectSession?.loginIdentity?.clientId) || ''
}

export async function getDeveloperId() {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (!connectSession) return ''
  return getDeveloperIdFromConnectSession(connectSession)
}

export async function getClientId() {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (!connectSession) return ''
  return getClientIdFromConnectSession(connectSession)
}

export const getLoggedUserEmail = async (): Promise<string> => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  return (connectSession && connectSession?.loginIdentity?.email) || ''
}
