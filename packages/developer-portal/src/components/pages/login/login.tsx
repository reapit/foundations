import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { showNotificationMessage } from '@/actions/notification-message'
import { Button, Level, FlexContainerBasic, Section } from '@reapit/elements-legacy'
import { getDefaultRoute } from '@/utils/auth-route'
import Routes from '@/constants/routes'
import messages from '@/constants/messages'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import {
  wrapper,
  container,
  register,
  registerLevel,
  loginButton,
  loginImages,
  imageContainer,
  loginImage,
  loginImageVisible,
} from './__styles__/login'
import stepOne from '../../../assets/images/login/step-1.svg'
import stepTwo from '../../../assets/images/login/step-2.svg'
import stepThree from '../../../assets/images/login/step-3.svg'
import { cx } from '@linaria/core'

export type LoginProps = {}

export const handleShowNotificationAfterPasswordChanged = (
  isPasswordChanged: boolean,
  localStorage: Storage,
  dispatch: Dispatch,
) => {
  return () => {
    if (isPasswordChanged) {
      dispatch(showNotificationMessage({ variant: 'info', message: messages.PASSWORD_CHANGED_SUCCESSFULLY }))
      localStorage.removeItem('isPasswordChanged')
    }
  }
}

export const onLoginButtonClick = () => {
  return () => {
    reapitConnectBrowserSession.connectLoginRedirect(getDefaultRoute(true))
  }
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const dispatch = useDispatch()
  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'
  const [imageShown, setImageShown] = useState(1)

  useEffect(handleShowNotificationAfterPasswordChanged(isPasswordChanged, localStorage, dispatch), [
    isPasswordChanged,
    localStorage,
    dispatch,
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
          <p>Welcome to Reapit Foundations</p>
        </Section>
        <Level className={registerLevel}>
          <Button className={loginButton} onClick={onLoginButtonClick()} fullWidth dataTest="login-button">
            Login
          </Button>
          <div className={register}>
            Don&apos;t have an account yet?&nbsp;
            <Link to={Routes.REGISTER}>Register</Link>
          </div>
        </Level>
        <FlexContainerBasic className="pt-8" centerContent>
          {process.env.APP_VERSION}
        </FlexContainerBasic>
      </div>
    </div>
  )
}

export default Login
