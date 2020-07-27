import * as React from 'react'
import { H3, Button, LevelRight, FormHeading, FormSubHeading, Section } from '@reapit/elements'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { selectClientId } from '@/selector/auth'

export const handleLogout = () => {
  reapitConnectBrowserSession.connectLogoutRedirect()
}

export const Settings: React.FC = () => {
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const customerId = selectClientId(connectSession)

  return (
    <>
      <Section>
        <H3>Settings</H3>
      </Section>
      <Section>
        <FormHeading>
          Customer ID: <strong>{customerId}</strong>{' '}
        </FormHeading>
        <FormSubHeading>
          This is your Customer ID which you will need for use with Private Apps and Web Components.
        </FormSubHeading>
        <LevelRight className="bt pt-4">
          {!connectIsDesktop && (
            <Button dataTest="logout-btn" variant="primary" type="button" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </LevelRight>
      </Section>
    </>
  )
}

export default Settings
