import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import Routes from '@/constants/routes'
import { Button, Level, FlexContainerBasic } from '@reapit/elements'
import { redirectToLogin } from '@reapit/cognito-auth'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'

export interface LoginProps {
  hasSession: boolean
}

const loginHandler = () => redirectToLogin(window.reapit.config.cognitoClientId, `${window.location.origin}`)

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const { hasSession } = props
  const { wrapper, container, image } = loginStyles

  const LoginForm = (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to Reapit Online Check List</p>
        <Level>
          <Button type="button" onClick={loginHandler} loading={false} variant="primary" disabled={false} fullWidth>
            Login
          </Button>
        </Level>
        <FlexContainerBasic className="pt-8" centerContent>
          {process.env.APP_VERSION}
        </FlexContainerBasic>
      </div>

      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )

  if (hasSession) {
    return <Redirect to={Routes.HOME} />
  }

  return LoginForm
}

export const mapStateToProps = (state: ReduxState): LoginProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
})

export default withRouter(connect(mapStateToProps, {})(Login))
