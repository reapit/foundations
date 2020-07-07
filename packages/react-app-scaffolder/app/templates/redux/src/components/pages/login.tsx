import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import Routes from '@/constants/routes'
import { Button, Level } from '@reapit/elements'
import connectImage from '@/assets/images/reapit-connect.png'
import loginStyles from '@/styles/pages/login.scss?mod'

import { redirectToLogin } from '@reapit/cognito-auth'

import logoImage from '@/assets/images/reapit-graphic.jpg'

export interface LoginProps {
  hasSession: boolean
}

const loginHandler = () => redirectToLogin(window.reapit.config.cognitoClientId, `${window.location.origin}`)

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const { wrapper, container, image } = loginStyles

  const { hasSession } = props

  if (hasSession) {
    return <Redirect to={Routes.HOME} />
  }

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to app-name</p>

        <Level>
          <Button type="button" onClick={loginHandler} loading={false} variant="primary" disabled={false} fullWidth>
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

export const mapStateToProps = (state: ReduxState): LoginProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
})

export default withRouter(connect(mapStateToProps, {})(Login))
