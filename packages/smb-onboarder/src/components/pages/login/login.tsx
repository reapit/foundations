import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Level, FlexContainerBasic } from '@reapit/elements'
import { redirectToLogin } from '@reapit/cognito-auth'
import Routes from '@/constants/routes'
import connectImage from '@/assets/images/reapit-connect.png'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { AuthContext } from '@/context'
import { loginFormContainer, imageContainer, loginPageContainer } from './__styles__'

export const redirectToLoginPage = () => {
  const cognitoClientId = window.reapit.config.cognitoClientId
  redirectToLogin(cognitoClientId, `${window.location.origin}`)
}

export const Login: React.FC = () => {
  const loginHandler = React.useCallback(redirectToLoginPage, [])
  const { loginSession } = React.useContext(AuthContext)

  if (loginSession) {
    return <Redirect to={Routes.HOME} />
  }

  return (
    <div className={loginPageContainer}>
      <div className={loginFormContainer}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to SMB</p>

        <Level>
          <Button fullWidth type="submit" variant="primary" onClick={loginHandler}>
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
