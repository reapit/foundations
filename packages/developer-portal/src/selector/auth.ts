import { ReapitConnectSession, LoginIdentity } from '@reapit/connect-session'

export const selectIsAdmin = (connectSession: ReapitConnectSession | null) => {
  return Boolean(connectSession?.loginIdentity?.adminId)
}

export const selectLoginIdentity = (connectSession: ReapitConnectSession | null) => {
  return (connectSession && connectSession?.loginIdentity) || ({} as LoginIdentity)
}
