import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ReduxState } from '@/types/core'
import Routes from '@/constants/routes'
import { Level, Button, FlexContainerBasic } from '@reapit/elements'
import { redirectToLogin } from '@reapit/cognito-auth'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'

export interface LoginProps {
  hasSession: boolean
}

const loginHandler = () =>
  redirectToLogin(process.env.COGNITO_CLIENT_ID_GEO_DIARY as string, `${window.location.origin}`)

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const { hasSession } = props
  const { wrapper, container, image } = loginStyles

  if (hasSession) {
    return <Redirect to={Routes.HOME} />
  }

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to Geo Diary</p>
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
}

export const mapStateToProps = (state: ReduxState): LoginProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
})

export default connect(mapStateToProps, {})(Login)
