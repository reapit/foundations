import * as React from 'react'
import { Redirect } from 'react-router-dom'

import Routes from '../../constants/routes'
import { Button, Level } from '@reapit/elements'

import * as loginStyles from './__styles__/styles'

import logoImage from '../../assets/images/reapit-graphic.jpg'
import connectImage from '../../assets/images/reapit-connect.png'
import { AuthContext } from '../../context'
import { ReapitConnectBrowserSessionInstance } from '../../core/connect-session'

export const Login: React.FunctionComponent = () => {
  const { wrapper, container, image } = loginStyles
  const { loginSession } = React.useContext(AuthContext)

  if (loginSession) {
    return <Redirect to={Routes.HOME} />
  }

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Level>
          <Button
            fullWidth
            type="submit"
            variant="primary"
            onClick={ReapitConnectBrowserSessionInstance.instance.connectLoginRedirect}
          >
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
