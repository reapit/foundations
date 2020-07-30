import * as React from 'react'
import { Loader, Section } from '@reapit/elements'
import { Forms } from './forms/forms'
import { Tabs } from './tabs'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

/**
 * render one of:
 * developer version and admin version - profile tab
 * ^ they both sit on "/developer/settings" route which is so confusing atm
 */
const SettingsPage: React.FC = () => {
  // it take a while to 'AUTH_LOGIN_SUCCESS' to fire. If you user is admin, they may exerience a flash
  // this make sure settings page don't render until 'loginIdentity' is availabe
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  if (!connectSession || !connectSession.loginIdentity) {
    return <Loader />
  }

  return (
    <>
      <Section>
        <Tabs />
      </Section>
      <Forms />
    </>
  )
}

export default SettingsPage
