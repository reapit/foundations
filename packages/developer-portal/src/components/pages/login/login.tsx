import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { showNotificationMessage } from '@/actions/notification-message'
import { BodyText, Button, elMt12, elP6, elPt8 } from '@reapit/elements'
import Routes from '@/constants/routes'
import messages from '@/constants/messages'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { wrapper, container, loginButton, imageContainer } from './__styles__/login'
import { KeyAnimation } from '@reapit/utils-react'
import { FlexContainer } from '@reapit/elements'
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
    reapitConnectBrowserSession.connectLoginRedirect(`${window.location.origin}${Routes.APPS}`)
  }
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const dispatch = useDispatch()
  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'
  const [keyStep, setKeyStep] = useState<1 | 2 | 3>(1)

  useEffect(handleShowNotificationAfterPasswordChanged(isPasswordChanged, localStorage, dispatch), [
    isPasswordChanged,
    localStorage,
    dispatch,
  ])

  return (
    <div className={container}>
      <div className={imageContainer}>
        <KeyAnimation step={keyStep} />
      </div>
      <div className={wrapper}>
        <img src={connectImage} alt="Reapit Connect Graphic" />
        <div className={cx(elP6)}>
          <BodyText>Welcome to Reapit Foundations</BodyText>
        </div>
        <Button
          onMouseOver={() => {
            setKeyStep(3)
          }}
          onMouseOut={() => {
            setKeyStep(1)
          }}
          className={loginButton}
          onClick={onLoginButtonClick()}
          fullWidth
          intent="primary"
        >
          Login
        </Button>
        <FlexContainer isFlexJustifyBetween className={cx(elMt12)}>
          <BodyText>Don&apos;t have an account yet?&nbsp;</BodyText>
          <Link to={Routes.REGISTER}>Register</Link>
        </FlexContainer>
        <FlexContainer className={cx(elPt8)} isFlexRow isFlexJustifyCenter>
          {process.env.APP_VERSION}
        </FlexContainer>
      </div>
    </div>
  )
}

export default Login
