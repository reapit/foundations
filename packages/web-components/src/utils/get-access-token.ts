import { setUserSession, LoginSession } from '@reapit/cognito-auth'

export const getAccessToken = async () => {
  const response = await setUserSession({
    userName: process.env.CLIENT_ACCOUNT_EMAIL || '',
    password: process.env.CLIENT_ACCOUNT_PASSWORD || '',
    loginType: 'CLIENT',
    mode: 'WEB',
  })

  return (response as LoginSession).accessToken
}
