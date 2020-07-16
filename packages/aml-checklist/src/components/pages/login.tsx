import * as React from 'react'
import { Button, Level, FlexContainerBasic } from '@reapit/elements'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const Login: React.FC = () => {
  const { wrapper, container, image } = loginStyles

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Level>
          <Button
            type="button"
            onClick={reapitConnectBrowserSession.connectLoginRedirect}
            loading={false}
            variant="primary"
            disabled={false}
            fullWidth
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
