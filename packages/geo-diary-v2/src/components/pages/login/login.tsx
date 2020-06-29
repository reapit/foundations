import * as React from 'react'
import { Redirect } from 'react-router-dom'

import { ROUTES } from '@/core/router'
import { Button, Level } from '@reapit/elements'
import loginStyles from '@/styles/pages/login.scss?mod'

import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'
import { AuthContext } from '@/context'
import { redirectToLogin } from '@reapit/cognito-auth'

export const redirectToLoginPage = () => {
  const cognitoClientId = window.reapit.config.cognitoClientId
  redirectToLogin(cognitoClientId, `${window.location.origin}`)
}

export const Login: React.FC = () => {
  const loginHandler = React.useCallback(redirectToLoginPage, [])
  const { wrapper, container, image } = loginStyles
  const { loginSession } = React.useContext(AuthContext)

  if (loginSession) {
    return <Redirect to={ROUTES.HOME} />
  }

  return (
    <div className={container}>
      <div className={wrapper}>
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

      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default Login
