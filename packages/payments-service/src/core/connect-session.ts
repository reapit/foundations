import { ReapitConnectServerSession } from '@reapit/connect-session-server'

const reapitConnectSession = new ReapitConnectServerSession({
  connectClientId: process.env.CONNECT_CLIENT_ID,
  connectClientSecret: process.env.CONNECT_CLIENT_SECRET,
  connectOAuthUrl: process.env.CONNECT_OAUTH_URL,
})

export default reapitConnectSession
