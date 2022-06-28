import { usePageId } from '@/components/hooks/use-page-id'
import React, { forwardRef } from 'react'
import { Loader, NavResponsive, ElNavContainer } from '@reapit/elements'
import { useApp } from '@/components/hooks/apps/use-app'
import { useConnectSession } from '@/components/hooks/connect-session'

export type NavigationProps = {}

export const Navigation = forwardRef<HTMLDivElement, NavigationProps>((_, ref) => {
  const { appId, setPageId } = usePageId()
  const { app, loading } = useApp(appId)
  const connectSession = useConnectSession()

  if (loading || !app || !connectSession) {
    return <Loader />
  }

  const options =
    app.navConfig.map((navConfig, idx) => ({
      itemIndex: idx + 1,
      text: navConfig.name,
      iconId: navConfig.icon,
      callback: () => {
        const dest = navConfig.destination
        setPageId(dest)
      },
    })) || []

  return (
    <ElNavContainer ref={ref}>
      <NavResponsive
        style={{ flex: 1 }}
        options={[
          {
            itemIndex: 0,
            callback: () => {
              setPageId('')
            },
          },
          ...options,
          {
            itemIndex: options.length + 1,
            text: 'Logout',
            iconId: 'logoutMenu',
            isSecondary: true,
            callback: () => {
              connectSession.connectLogoutRedirect()
            },
          },
        ]}
      />
    </ElNavContainer>
  )
})
