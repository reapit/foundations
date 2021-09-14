import { js } from './js'
import { lint } from './format'

export const generateSession = () => {
  return lint(js`
      import { ReapitConnectBrowserSession } from '@reapit/connect-session'

      const session = new ReapitConnectBrowserSession({
        connectClientId: "qe2hl0f1cmr1a9eotu1dp4ror",
        connectUserPoolId: "eu-west-2_kiftR4qFc",
        connectOAuthUrl: "https://connect.dev.paas.reapit.cloud",
      })

      export default session
  `)
}
