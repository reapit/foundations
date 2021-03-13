import * as React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { Button, Level, FlexContainerBasic, Section } from '@reapit/elements'
import connectImage from '@/assets/images/reapit-connect.png'
import { loginContainer, wrapper, loginImage, imageContainer, loginLevel } from './__styles__'

export type LoginProps = {}

export const onLoginButtonClick = () => reapitConnectBrowserSession.connectLoginRedirect()

export const Login: React.FunctionComponent<LoginProps> = () => {
  return (
    <div className={loginContainer}>
      <div className={imageContainer}>
        <div className={loginImage}></div>
      </div>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Section>
          <p>Welcome to Reapit Foundations</p>
        </Section>
        <Level className={loginLevel}>
          <Button
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
    </div>
  )
}

export default Login
