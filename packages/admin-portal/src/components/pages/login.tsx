import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoginSession, selectRefreshSession } from '@/selector/auth'
import { redirectToLogin } from '@reapit/cognito-auth'
import { Button, Level, FlexContainerBasic, Section } from '@reapit/elements'
import Routes from '@/constants/routes'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'

const { wrapper, container, image, registerLevel, loginButton } = loginStyles

export type LoginProps = {}

export const onLoginButtonClick = () => {
  const redirectRoute = `${window.location.origin}${Routes.APPROVALS}`
  redirectToLogin(window.reapit.config.cognitoClientId, redirectRoute, 'ADMIN')
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const loginSession = useSelector(selectLoginSession)
  const refreshSession = useSelector(selectRefreshSession)

  const hasSession = !!loginSession || !!refreshSession

  if (hasSession) {
    return <Redirect to={Routes.APPROVALS} />
  }

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Section>
          <p>Welcome to Reapit Foundations</p>
        </Section>
        <Level className={registerLevel}>
          <Button
            className={loginButton}
            type="button"
            onClick={onLoginButtonClick}
            loading={false}
            variant="primary"
            disabled={false}
            fullWidth
            dataTest="login-button"
          >
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

export default Login
