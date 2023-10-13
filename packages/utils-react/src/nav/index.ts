import { ReapitConnectSession } from '@reapit/connect-session'

export const getAvatarInitials = (session: ReapitConnectSession | null) => {
  if (!session?.loginIdentity) return ''
  const { name } = session.loginIdentity
  const nameArray = name.split(' ')
  const firstName = nameArray[0]
  const lastName = nameArray[nameArray.length - 1]
  return `${firstName.charAt(0)}${lastName.charAt(0)}`
}
