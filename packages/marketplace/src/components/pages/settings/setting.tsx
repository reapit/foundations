import * as React from 'react'
import { H3, Button, LevelRight, FormHeading, FormSubHeading, Section } from '@reapit/elements'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { selectClientId } from '@/selector/auth'

// clean
// FIXME(auth)
/* TESTME(auth) shouldable to lougout - settings */
export const handleLogout = () => {
  reapitConnectBrowserSession.connectLogoutRedirect()
  // dispatch(authLogout())
}

export const Settings: React.FC = () => {
  // s get hook
  // FIXME(selectDeveloperId)
  /**
   * desktop - logut
   * customer id as client id
   */
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const customerId = selectClientId(connectSession)
  // refactor to use hook
  // const customerId = useSelector(selectClientId)
  // const isDesktopMode = useSelector(selectIsDesktopMode)
  // not show logout button on desktop

  return (
    <>
      <Section>
        <H3>Settings</H3>
      </Section>
      <Section>
        <FormHeading>
          {' '}
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
