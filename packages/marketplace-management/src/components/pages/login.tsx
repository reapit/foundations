import React, { FC, useEffect, useState } from 'react'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import {
  loginContainer,
  wrapper,
  loginImage,
  imageContainer,
  loginImages,
  loginImageVisible,
} from './__styles__/styles'
import stepOne from '../../assets/images/login/step-1.svg'
import stepTwo from '../../assets/images/login/step-2.svg'
import stepThree from '../../assets/images/login/step-3.svg'
import { cx } from '@linaria/core'
import { FlexContainer, ButtonGroup, elMb11 } from '@reapit/elements'
import { Button } from '@reapit/elements'

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
        <div className={elMb11}>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </div>
        <ButtonGroup alignment="center">
          <Button
            size={4}
            type="button"
            onClick={loginHandler}
            loading={false}
            intent="primary"
            disabled={false}
            fullWidth
          >
            Login
          </Button>
        </ButtonGroup>
        <FlexContainer isFlexJustifyCenter>{process.env.APP_VERSION}</FlexContainer>
      </div>
    </div>
  )
}

export default Login
