import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { ROUTES } from '@/core/router'
import { Button, Level } from '@reapit/elements'
import { redirectToLogin } from '@reapit/cognito-auth'
import { AuthContext } from '@/context'
import { loginPageContainer, loginPageFormContainer, loginPageImageContainer } from './__styles__'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'

export const redirectToLoginPage = () => {
  const cognitoClientId = window.reapit.config.cognitoClientId
  redirectToLogin(cognitoClientId, `${window.location.origin}`)
}

export const Login: React.FC = () => {
  const loginHandler = React.useCallback(redirectToLoginPage, [])
  const { loginSession } = React.useContext(AuthContext)

  if (loginSession) {
    return <Redirect to={ROUTES.HOME} />
  }

  return (
    <div className={loginPageContainer}>
      <div className={loginPageFormContainer}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to geo-diary-v2</p>

        <Level>
          <Button fullWidth type="submit" variant="primary" onClick={loginHandler}>
            Login
          </Button>
        </Level>
      </div>

      <div className={loginPageImageContainer}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default Login
