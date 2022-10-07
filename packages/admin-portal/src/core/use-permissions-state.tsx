import React, { FC, createContext, useContext, useMemo, useState, Dispatch, SetStateAction, useEffect } from 'react'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { elMt5, Loader, PageContainer, PersistentNotification } from '@reapit/elements'

export interface PermissionsStateHook {
  hasReadAccess: boolean
  hasWriteAccess: boolean
}

export const handleAccessPermissions = (connectSession: ReapitConnectSession | null) => (): PermissionsStateHook => {
  const groups = connectSession?.loginIdentity?.groups ?? []
  const hasWriteAccess = groups.includes('ReapitEmployeeFoundationsAdmin')
  const readAccess = groups.includes('ReapitEmployee')
  const hasReadAccess = readAccess && !hasWriteAccess

  return {
    hasReadAccess,
    hasWriteAccess,
  }
}

export const handleBannerTimeout = (setBannerVisible: Dispatch<SetStateAction<boolean>>) => () => {
  const timeout = setTimeout(() => {
    setBannerVisible(false)
  }, 5000)

  return () => clearTimeout(timeout)
}

export const handleBannerClick =
  (setBannerVisible: Dispatch<SetStateAction<boolean>>, bannerVisibile: boolean) => () => {
    setBannerVisible(!bannerVisibile)
  }

export const PermissionsStateContext = createContext<PermissionsStateHook>({} as PermissionsStateHook)

const { Provider } = PermissionsStateContext

export const PermissionsProvider: FC = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [bannerVisible, setBannerVisible] = useState<boolean>(true)
  const { hasReadAccess, hasWriteAccess } = useMemo(handleAccessPermissions(connectSession), [connectSession])

  useEffect(handleBannerTimeout(setBannerVisible), [])

  const hasNoAccess = !hasReadAccess && !hasWriteAccess

  return !connectSession ? (
    <Loader />
  ) : hasNoAccess ? (
    <PageContainer>
      <PersistentNotification isFullWidth isInline isExpanded intent="danger">
        You do not have permission to access this application.
      </PersistentNotification>
    </PageContainer>
  ) : (
    <Provider
      value={{
        hasReadAccess,
        hasWriteAccess,
      }}
    >
      {hasReadAccess && (
        <PersistentNotification
          className={elMt5}
          onClick={handleBannerClick(setBannerVisible, bannerVisible)}
          isExpanded={bannerVisible}
          intent="secondary"
        >
          You have read only access to the Admin Portal. This means some buttons and actions will be unavailable or
          disabled while using the app.
        </PersistentNotification>
      )}
      {children}
    </Provider>
  )
}

export const usePermissionsState = (): PermissionsStateHook => {
  return useContext(PermissionsStateContext)
}
