import React, { FC, useEffect, useRef, useState } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  Subtitle,
  Title,
  FlexContainer,
  elMb12,
  useModal,
  Modal,
} from '@reapit/elements'
import reapitLogo from '../../assets/images/reapit-logo.svg'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { KeyAnimation } from '@reapit/utils-react'
import { LoginContainer, LoginContentWrapper, LoginImageContainer } from './__styles__'

export const onLoginButtonClick = () => () => {
  reapitConnectBrowserSession.connectLoginRedirect()
}

export const Login: FC = () => {
  const [keyStep, setKeyStep] = useState<1 | 2 | 3>(1)
  const { modalIsOpen, closeModal, openModal } = useModal()
  const [currentIdp, setCurrentIdp] = useState<string>(localStorage.getItem('__LOGIN_TYPE__') || 'cognito')
  const prevIdp = useRef(currentIdp)

  useEffect(() => {
    localStorage.setItem('__LOGIN_TYPE__', currentIdp)
    if (currentIdp !== prevIdp.current) window.location.href = window.location.origin + '/login'
  }, [currentIdp])

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
        </ButtonGroup>
        <BodyText hasGreyText>{process.env.APP_VERSION}</BodyText>
        <Button intent="secondary" onClick={openModal}>
          Change IDP
        </Button>
      </LoginContentWrapper>
      <Modal isOpen={modalIsOpen} onModalClose={closeModal}>
        <Title>Change IDP</Title>
        <BodyText>Change the IDP for reapit connect</BodyText>
        <BodyText>The current IDP is set to {currentIdp}</BodyText>
        <ButtonGroup>
          <Button
            intent="primary"
            onClick={() => {
              setCurrentIdp('cognito')
            }}
          >
            Cognito
          </Button>
          <Button
            intent="primary"
            onClick={() => {
              setCurrentIdp('keycloak')
            }}
          >
            Keycloak
          </Button>
          <Button
            intent="primary"
            onClick={() => {
              setCurrentIdp('ory')
            }}
          >
            Ory
          </Button>
        </ButtonGroup>
      </Modal>
    </LoginContainer>
  )
}

export default Login
