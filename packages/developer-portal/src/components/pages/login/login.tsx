import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { showNotificationMessage } from '../../../actions/notification-message'
import { BodyText, Button, ButtonGroup, Subtitle, Title, FlexContainer, elMb12 } from '@reapit/elements'
import Routes from '../../../constants/routes'
import messages from '../../../constants/messages'
import reapitLogo from '../../../assets/images/reapit-logo.svg'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { KeyAnimation } from '@reapit/utils-react'
import { LoginContainer, LoginContentWrapper, LoginImageContainer } from './__styles__'
import { navigate } from '../../../utils/navigation'

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

export const Login: FC<LoginProps> = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'
  const [keyStep, setKeyStep] = useState<1 | 2 | 3>(1)

  useEffect(handleShowNotificationAfterPasswordChanged(isPasswordChanged, localStorage, dispatch), [
    isPasswordChanged,
    localStorage,
    dispatch,
  ])

  return (
    <LoginContainer>
      <LoginImageContainer>
        <KeyAnimation step={keyStep} />
      </LoginImageContainer>
      <LoginContentWrapper>
        <img src={reapitLogo} alt="Reapit Connect Graphic" />
        <FlexContainer isFlexColumn>
          <Title hasNoMargin hasCenteredText>
            Welcome
          </Title>
          <Subtitle hasCenteredText>to Reapit Foundations</Subtitle>
        </FlexContainer>
        <ButtonGroup
          alignment="center"
          className={elMb12}
          onMouseOver={() => {
            setKeyStep(3)
          }}
          onMouseOut={() => {
            setKeyStep(1)
          }}
        >
          <Button onClick={onLoginButtonClick()} intent="primary" size={3}>
            Login With Reapit
          </Button>
          <Button onClick={navigate(history, Routes.SELECT_ROLE)} intent="secondary" size={3}>
            Register
          </Button>
        </ButtonGroup>
        <BodyText hasGreyText>{process.env.APP_VERSION}</BodyText>
      </LoginContentWrapper>
    </LoginContainer>
  )
}

export default Login
