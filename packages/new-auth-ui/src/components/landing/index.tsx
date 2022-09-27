import React from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session-next'
import { BodyText, Button, FlexContainer, Title } from '@reapit/elements'

export const Landing = () => {
  const { connectSession, connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)

  return (
    <FlexContainer isFlexColumn>
      <div>
        <Title>You is Logged in bro!</Title>
        <BodyText>
          Logged in with <strong>{localStorage.getItem('__LOGIN_TYPE__')}</strong>
        </BodyText>
        <Button intent="primary" onClick={() => connectLogoutRedirect()}>
          Logout
        </Button>
      </div>
      <pre>{JSON.stringify(connectSession, undefined, 2)}</pre>
    </FlexContainer>
  )
}

export default Landing
