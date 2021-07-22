import React, { FC, useEffect, useState } from 'react'
import { Button, Level, FlexContainerBasic } from '@reapit/elements-legacy'
import loginStyles from '@/styles/pages/login.scss?mod'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import stepOne from '../../assets/images/login/step-1.svg'
import stepTwo from '../../assets/images/login/step-2.svg'
import stepThree from '../../assets/images/login/step-3.svg'
import { cx } from '@linaria/core'

const handleLogin = () => reapitConnectBrowserSession.connectLoginRedirect()

export const Login: FC = () => {
  const [imageShown, setImageShown] = useState(1)
  const { wrapper, container, imageContainer, loginImage, loginImages, loginImageVisible } = loginStyles

  useEffect(() => {
    const interval = window.setInterval(() => {
      setImageShown((prev) => {
        if (prev < 3) {
          return prev + 1
        }

        return prev
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [imageShown])

  return (
    <div className={container}>
      <div className={imageContainer}>
        <div className={loginImages}>
          <img className={cx(loginImage, imageShown === 1 && loginImageVisible)} src={stepOne} />
          <img className={cx(loginImage, imageShown === 2 && loginImageVisible)} src={stepTwo} />
          <img className={cx(loginImage, imageShown === 3 && loginImageVisible)} src={stepThree} />
        </div>
      </div>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Level>
          <Button type="button" onClick={handleLogin} loading={false} variant="primary" disabled={false} fullWidth>
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
