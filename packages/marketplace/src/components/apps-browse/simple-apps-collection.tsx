import React, { FC, memo, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitGet } from '@reapit/use-reapit-data'
import { AppsBrowseConfigItemInterface, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { elFadeIn, FlexContainer, MediaType, PlaceholderImage, useMediaQuery } from '@reapit/elements'
import { AppIcon, SimpleAppsCol, AppTitle, SimpleAppStrapline } from './__styles__'
import { useReapitConnect } from '@reapit/connect-session'
import { RoutePaths } from '../../constants/routes'
import { navigateRoute } from '../../utils/navigation'
import { useNavigate } from 'react-router-dom'
import { filterRestrictedAppsList } from '../../utils/browse-app'

interface SimpleAppsCollectionProps {
  configItem?: AppsBrowseConfigItemInterface
}

export const handleMaxLength = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop, isWideScreen } = mediaQuery

  if (isMobile || isTablet) return 3
  if (isDesktop) return 4
  if (isWideScreen) return 6

  return 8
}

export const SimpleAppsCollection: FC<SimpleAppsCollectionProps> = memo(({ configItem }) => {
  const navigate = useNavigate()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const mediaQuery = useMediaQuery()
  const maxLength = useMemo(handleMaxLength(mediaQuery), [mediaQuery])
  const clientId = connectSession?.loginIdentity.clientId
  const product = connectSession?.loginIdentity.orgProduct ?? 'agencyCloud'
  const { filters } = configItem ?? {}
  const queryParams = filters ? { ...filters, clientId, product } : { clientId, product }

  const [unfilteredApps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [filters],
  })

  const apps = useMemo(filterRestrictedAppsList(unfilteredApps, connectSession), [unfilteredApps])

  return (
    <>
      {apps?.data?.map(({ id, name, summary, iconUri }, index) => {
        if (maxLength <= index) return null

        return (
          <SimpleAppsCol key={id} onClick={navigateRoute(navigate, `${RoutePaths.APPS_BROWSE}/${id}`)}>
            <FlexContainer isFlexJustifyBetween>
              <FlexContainer isFlexColumn isFlexJustifyCenter>
                <FlexContainer>
                  {iconUri ? (
                    <AppIcon className={elFadeIn} src={iconUri} alt={name} />
                  ) : (
                    <PlaceholderImage placeholder="placeholderSmall" size={32} />
                  )}
                  <AppTitle>{name}</AppTitle>
                </FlexContainer>
                <SimpleAppStrapline>{summary}</SimpleAppStrapline>
              </FlexContainer>
            </FlexContainer>
          </SimpleAppsCol>
        )
      })}
    </>
  )
})
