import React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { getAvatarInitials, isDemo } from '@reapit/utils-react'

export const openNewPage = (uri: string) => (event?: MouseEvent) => {
  event?.preventDefault()
  event?.stopPropagation()
  window.open(uri, '_blank', 'noopener noreferrer')
}

export const Nav: React.FC = () => {
  const { connectLogoutRedirect, connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const demoEnv = isDemo()
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
  ]

  return (
    <NavResponsive
      options={navOptions}
      appSwitcherOptions={[
        {
          text: 'AppMarket',
          callback: openNewPage('https://marketplace.reapit.cloud'),
          iconUrl: <Icon icon="reapitLogoSmall" />,
        },
        {
          text: 'DevPortal',
          callback: openNewPage('https://developers.reapit.cloud'),
          iconUrl: <Icon icon="reapitLogoSmall" />,
        },
      ]}
      avatarText={getAvatarInitials(connectSession)}
      avatarOptions={
        !connectIsDesktop && !demoEnv
          ? [
              {
                callback: connectLogoutRedirect,
                text: 'Logout',
              },
            ]
          : undefined
      }
    />
  )
}

export default Nav
