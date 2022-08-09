import React, { FC, useMemo } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitGet } from '@reapit/utils-react'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import {
  InstalledAppsCol,
  InstalledAppsContainer,
  InstalledAppsGrid,
  InstalledAppsIcon,
  InstalledAppsIconWrapper,
  InstalledAppsInnerContainer,
  InstalledAppsText,
  InstallMoreApps,
} from './__styles__'
import { elFadeIn, Loader, PlaceholderImage } from '@reapit/elements'
import { AppsInstalledSuggested } from './apps-installed-suggested'
import { handleLaunchApp, navigate } from '../../utils/navigation'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router'
import { filterRestrictedAppsList } from '../../utils/browse-app'

export const AppsInstalled: FC = () => {
  const history = useHistory()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const developerId = connectSession?.loginIdentity.developerId
  const product = connectSession?.loginIdentity.orgProduct
  const baseParams = {
    clientId,
    onlyInstalled: true,
    showHiddenApps: true,
    isDirectApi: false,
    pageSize: 100,
    product,
  }

  const queryParams = developerId ? { ...baseParams, developerId } : baseParams

  const [unfilteredApps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [clientId],
  })

  const apps = useMemo(filterRestrictedAppsList(unfilteredApps, connectSession), [unfilteredApps])

  return (
    <InstalledAppsContainer>
      <InstalledAppsInnerContainer>
        {appsLoading ? (
          <Loader />
        ) : (
          <InstalledAppsGrid>
            {apps?.data?.map(({ id, name, iconUri, launchUri }) => (
              <InstalledAppsCol
                className={elFadeIn}
                key={id}
                onClick={handleLaunchApp(connectIsDesktop, id, launchUri)}
              >
                <InstalledAppsIconWrapper>
                  {iconUri ? (
                    <InstalledAppsIcon src={iconUri} alt={name} />
                  ) : (
                    <PlaceholderImage placeholder="placeholderSmall" size={64} />
                  )}
                </InstalledAppsIconWrapper>
                <InstalledAppsText>{name}</InstalledAppsText>
              </InstalledAppsCol>
            ))}
            <InstallMoreApps onClick={navigate(history, Routes.APPS_BROWSE)}>
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="19.5" cy="26.5" r="1.5" fill="black" />
                <circle cx="25.5" cy="26.5" r="1.5" fill="black" />
                <circle cx="31.5" cy="26.5" r="1.5" fill="black" />
              </svg>
              Install More Apps
            </InstallMoreApps>
          </InstalledAppsGrid>
        )}
      </InstalledAppsInnerContainer>
      <AppsInstalledSuggested />
    </InstalledAppsContainer>
  )
}
