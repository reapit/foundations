import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import Routes from '@/constants/routes'
import { Button, Level } from '@reapit/elements'
import { redirectToLogin } from '@reapit/cognito-auth'

import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/lifetimelegalwhite.png'
import connectImage from '@/assets/images/reapit-connect.png'

export interface LoginProps {
  hasSession: boolean
}

const loginHandler = () => redirectToLogin(process.env.COGNITO_CLIENT_ID_LTL_APP as string, `${window.location.origin}`)

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const { hasSession } = props
  const { wrapper, container, imageLogo, wrapperBorder } = loginStyles

  if (hasSession) {
    return <Redirect to={Routes.SEARCH} />
  }

  const LoginForm = (
    <div className={container}>
      <div className={wrapper}>
        <img className={imageLogo} src={logoImage} alt="lifetimelegal" />
        <div className={wrapperBorder}>
          <Level>
            <img src={connectImage} alt="Reapit Connect Graphic" />
          </Level>
          <Level>
            <Button type="button" onClick={loginHandler} loading={false} variant="primary" disabled={false} fullWidth>
              Login
            </Button>
          </Level>
        </div>
      </div>
    </div>
  )

  return LoginForm
}

export const mapStateToProps = (state: ReduxState): LoginProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
})

export default withRouter(connect(mapStateToProps, {})(Login))
