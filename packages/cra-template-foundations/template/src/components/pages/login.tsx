import React, { FC, useEffect, useState } from 'react'
import { BodyText, Button, FlexContainer } from '@reapit/elements'
import connectImage from '../../assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '../../core/connect-session'
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
          <img className={cx(loginImage, imageShown === 1 && loginImageVisible)} src={stepOne} alt="login graphic" />
          <img className={cx(loginImage, imageShown === 2 && loginImageVisible)} src={stepTwo} alt="login graphic" />
          <img className={cx(loginImage, imageShown === 3 && loginImageVisible)} src={stepThree} alt="login graphic" />
        </div>
      </div>
      <div className={wrapper}>
        <BodyText>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </BodyText>
        <BodyText className={loginLevel}>
          <Button type="button" onClick={loginHandler} loading={false} intent="primary" disabled={false} fullWidth>
            Login
          </Button>
        </BodyText>
        <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
          {process.env.APP_VERSION}
        </FlexContainer>
      </div>
    </div>
  )
}

export default Login
