import React, { FC } from 'react'
import { Button, Icon, SmallText, Subtitle } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

export const handleLogout = (connectLogoutRedirect: () => void) => () => {
  connectLogoutRedirect()
}

export const Controls: FC = () => {
  const { connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  return (
    <>
      <Icon icon="reapitConnectInfographic" iconSize="large" />
      <Subtitle>Settings</Subtitle>
      <SmallText hasGreyText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem illo eos ipsum! Officia, aut natus
        molestiae nulla corrupti voluptatem, ipsum temporibus rerum, ullam nisi repellat! Culpa a quam ratione
        consectetur!
      </SmallText>

      <Button onClick={handleLogout(connectLogoutRedirect)} intent="critical" chevronRight>
        Logout
      </Button>
    </>
  )
}
