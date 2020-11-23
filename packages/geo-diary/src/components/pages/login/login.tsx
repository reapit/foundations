import * as React from 'react'
import { Button, Level, FlexContainerBasic } from '@reapit/elements'
import { loginPageContainer, loginPageFormContainer, loginPageImageContainer } from './__styles__'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'

const handleLogin = () => reapitConnectBrowserSession.connectLoginRedirect()

export const Login: React.FC = () => {
  return (
    <div className={loginPageContainer}>
      <div className={loginPageFormContainer}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Level>
          <Button fullWidth type="submit" variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Level>
        <FlexContainerBasic className="pt-8" centerContent>
          {process.env.APP_VERSION}
        </FlexContainerBasic>
      </div>

      <div className={loginPageImageContainer}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default Login
