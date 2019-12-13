import { setUserSession } from '@reapit/cognito-auth'

export const getAccessToken = async () => {
  const response = await setUserSession({
    userName: 'cbryan@reapit.com',
    password: 'T00lb0x53',
    loginType: 'CLIENT',
    mode: 'WEB'
  })
  return response.accessToken
}
