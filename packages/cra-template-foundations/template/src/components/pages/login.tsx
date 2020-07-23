import * as React from 'react'
import { Button, Level } from '@reapit/elements'
import * as loginStyles from './__styles__/styles'

import logoImage from '../../assets/images/reapit-graphic.jpg'
import connectImage from '../../assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const loginHandler = () => reapitConnectBrowserSession.connectLoginRedirect(window.location.origin)

export const Login: React.FunctionComponent = () => {
  const { wrapper, container, image } = loginStyles

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
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
