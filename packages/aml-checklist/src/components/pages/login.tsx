import * as React from 'react'
import { Button, Level, FlexContainerBasic } from '@reapit/elements-legacy'
import loginStyles from '@/styles/pages/login.scss?mod'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'

const handleLogin = () => reapitConnectBrowserSession.connectLoginRedirect()

export const Login: React.FC = () => {
  const { wrapper, container, imageContainer, loginImage } = loginStyles

  return (
    <div className={container}>
      <div className={imageContainer}>
        <div className={loginImage}></div>
      </div>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Level>
          <Button type="button" onClick={handleLogin} loading={false} variant="primary" disabled={false} fullWidth>
            Login
          </Button>
        </Level>
        <FlexContainerBasic className="pt-8" centerContent>
          {process.env.APP_VERSION}
        </FlexContainerBasic>
      </div>
    </div>
  )
}

export default Login
