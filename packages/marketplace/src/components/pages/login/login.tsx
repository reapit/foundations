import React, { FC, useEffect, useState } from 'react'
import { Button, Level, FlexContainerBasic, Section, notification } from '@reapit/elements-legacy'
import { getDefaultRoute } from '@/utils/auth-route'
import messages from '@/constants/messages'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import {
  wrapper,
  container,
  registerLevel,
  loginButton,
  loginImages,
  imageContainer,
  loginImage,
  loginImageVisible,
} from './__styles__'
import stepOne from '../../../assets/images/login/step-1.svg'
import stepTwo from '../../../assets/images/login/step-2.svg'
import stepThree from '../../../assets/images/login/step-3.svg'
import { cx } from '@linaria/core'

export type LoginProps = {}

export const handleShowNotificationAfterPasswordChanged = (isPasswordChanged: boolean, localStorage: Storage) => {
  return () => {
    if (isPasswordChanged) {
      notification.success({ message: messages.PASSWORD_CHANGED_SUCCESSFULLY })
      localStorage.removeItem('isPasswordChanged')
    }
  }
}

export const onLoginButtonClick = () => {
  const redirectRoute = getDefaultRoute()
  reapitConnectBrowserSession.connectLoginRedirect(redirectRoute)
}

export const Login: FC<LoginProps> = () => {
  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'
  const [imageShown, setImageShown] = useState(1)

  useEffect(handleShowNotificationAfterPasswordChanged(isPasswordChanged, localStorage), [
    isPasswordChanged,
    localStorage,
  ])

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
        <Section>
          <p>Welcome to Reapit Marketplace</p>
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
    </div>
  )
}

export default Login
