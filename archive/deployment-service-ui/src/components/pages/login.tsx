import React, { FC, useEffect, useState } from 'react'
import { Button, FlexContainerBasic, Level } from '@reapit/elements-legacy'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import {
  loginContainer,
  wrapper,
  loginImage,
  imageContainer,
  loginLevel,
  loginImages,
  loginImageVisible,
} from './__styles__/styles'
import stepOne from '../../assets/images/login/step-1.svg'
import stepTwo from '../../assets/images/login/step-2.svg'
import stepThree from '../../assets/images/login/step-3.svg'
import { cx } from '@linaria/core'

export const loginHandler = () => reapitConnectBrowserSession.connectLoginRedirect()

export const Login: FC = () => {
  const [imageShown, setImageShown] = useState(1)
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
    <div className={loginContainer}>
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
