import { usePageId } from '@/components/hooks/use-page-id'
import React, { forwardRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useReapitConnect } from '@reapit/connect-session'
import path from 'path'
import { Loader, NavResponsive, ElNavContainer } from '@reapit/elements'
import { useApp } from '@/components/hooks/apps/use-app'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type NavigationProps = {}

export const Navigation = forwardRef<HTMLDivElement, NavigationProps>((_, ref) => {
  const { appId } = usePageId()
  const { app, loading } = useApp(appId)
  const { connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const history = useHistory()

  if (loading) {
    return <Loader />
  }

  const options =
    app?.navConfig.map((navConfig, idx) => ({
      itemIndex: idx + 1,
      text: navConfig.name,
      iconId: navConfig.icon,
      callback: () => {
        const dest = navConfig.destination
        const pathname = path.join('/', appId || '', dest === '~' ? '' : dest)

        history.push(pathname)
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
              const pathname = path.join('/', appId || '')
              history.push(pathname)
            },
          },
          ...options,
          {
            itemIndex: options.length + 1,
            text: 'Logout',
            iconId: 'logoutMenu',
            isSecondary: true,
            callback: () => {
              connectLogoutRedirect()
            },
          },
        ]}
      />
    </ElNavContainer>
  )
})
