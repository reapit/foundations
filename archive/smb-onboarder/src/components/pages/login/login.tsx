import * as React from 'react'
import { Button, Level, FlexContainerBasic } from '@reapit/elements'
import connectImage from '@/assets/images/reapit-connect.png'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { loginFormContainer, imageContainer, loginPageContainer } from './__styles__'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const redirectToLoginPage = () => {
  reapitConnectBrowserSession.connectLoginRedirect()
}

export const Login: React.FC = () => {
  return (
    <div className={loginPageContainer}>
      <div className={loginFormContainer}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to SMB</p>

        <Level>
          <Button fullWidth type="submit" variant="primary" onClick={redirectToLoginPage}>
            Login
          </Button>
        </Level>
        <FlexContainerBasic className="pt-8" centerContent>
          {process.env.APP_VERSION}
        </FlexContainerBasic>
      </div>

      <div className={imageContainer}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default Login
