import * as React from 'react'
import { selectIsAdmin, selectLoginIdentity } from '@/selector/auth'
import { useSelector } from 'react-redux'
import { Loader, Section } from '@reapit/elements'
import { Forms } from './forms/forms'
import { Tabs } from '../tabs'

export const renderPageContent = ({ isProd, isAdmin }: { isProd: Boolean; isAdmin: Boolean }) => {
  if (isAdmin && !isProd) {
    return (
      <>
        <Section>
          <Tabs />
        </Section>
        <Forms />
      </>
    )
  }

  return <Forms />
}

/**
 * render one of:
 * developer version and admin version - profile tab
 * ^ they both sit on "/developer/settings" route which is so confusing atm
 */
const DevelperSettingsPage: React.FC = () => {
  const isAdmin = useSelector(selectIsAdmin)
  const isProd = window.reapit.config.appEnv === 'production'

  // it take a while to 'AUTH_LOGIN_SUCCESS' to fire. If you user is admin, they may exerience a flash
  // this make sure settings page don't render until 'loginIdentity' is availabe
  const loginIdentity = useSelector(selectLoginIdentity)

  if (!loginIdentity) {
    return <Loader />
  }

  return renderPageContent({ isAdmin, isProd })
}

export default DevelperSettingsPage
