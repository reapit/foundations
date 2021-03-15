import * as React from 'react'
import { Button, FlexContainerBasic, Level } from '@reapit/elements'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { loginContainer, wrapper, loginImage, imageContainer, loginLevel } from './__styles__/index'

export const loginHandler = () => reapitConnectBrowserSession.connectLoginRedirect()

export const Login: React.FunctionComponent = () => {
  return (
    <div className={loginContainer}>
      <div className={imageContainer}>
        <div className={loginImage}></div>
      </div>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Level className={loginLevel}>
          <Button
            type="button"
            onClick={loginHandler}
            loading={false}
            variant="primary"
            disabled={false}
            fullWidth
            dataTest="login-button"
          >
            Login
          </Button>
        </Level>
        <FlexContainerBasic centerContent>{process.env.APP_VERSION}</FlexContainerBasic>
      </div>
    </div>
  )
}

export default Login
