import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BodyText, Button, ButtonGroup, Subtitle, Title, FlexContainer, elMb12 } from '@reapit/elements'
import Routes from '../../constants/routes'
import reapitLogo from '../../assets/images/reapit-logo.svg'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { KeyAnimation } from '@reapit/utils-react'
import { LoginContainer, LoginContentWrapper, LoginImageContainer } from './__styles__'
import { navigateRoute } from '../../utils/navigation'

export const onLoginButtonClick = () => () => {
  reapitConnectBrowserSession.connectLoginRedirect(`${window.location.origin}${Routes.APPS}`)
}

export const Login: FC = () => {
  const navigate = useNavigate()
  const [keyStep, setKeyStep] = useState<1 | 2 | 3>(1)

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
          <Button onClick={navigateRoute(navigate, Routes.SELECT_ROLE)} intent="secondary" size={3}>
            Register
          </Button>
        </ButtonGroup>
        <BodyText hasGreyText>{process.env.APP_VERSION}</BodyText>
      </LoginContentWrapper>
    </LoginContainer>
  )
}

export default Login
