import React, { FC, memo, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { objectToQuery, useReapitGet } from '@reapit/use-reapit-data'
import { elFadeIn, elMb1, FlexContainer, MediaType, PlaceholderImage, useMediaQuery } from '@reapit/elements'
import {
  AppsBrowseConfigItemFiltersInterface,
  AppsBrowseConfigItemInterface,
  AppSummaryModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { AppIcon, AppTitle, AppsCol, FeaturedAppStrapline } from './__styles__'
import { useReapitConnect } from '@reapit/connect-session'
import { navigateRoute } from '../../utils/navigation'
import { RoutePaths } from '../../constants/routes'
import { useNavigate } from 'react-router-dom'
import { filterRestrictedAppsList } from '../../utils/browse-app'

interface FeaturedAppsCollectionProps {
  configItem?: AppsBrowseConfigItemInterface
}

export const handleMaxLength = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop, isWideScreen } = mediaQuery

  if (isTablet) return 2
  if (isMobile || isDesktop) return 3
  if (isWideScreen) return 4

  return 6
}

export const FeaturedAppsCollection: FC<FeaturedAppsCollectionProps> = memo(({ configItem }) => {
  const navigate = useNavigate()
  const mediaQuery = useMediaQuery()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const product = connectSession?.loginIdentity.orgProduct ?? 'agencyCloud'
  const maxLength = useMemo(handleMaxLength(mediaQuery), [mediaQuery])

  const clientId = connectSession?.loginIdentity.clientId
  const { filters } = configItem ?? {}
  const queryParams = filters
    ? { ...objectToQuery<AppsBrowseConfigItemFiltersInterface>(filters), clientId, product }
    : { clientId, product }

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
          <AppsCol className={elFadeIn} key={id} onClick={navigateRoute(navigate, `${RoutePaths.APPS_BROWSE}/${id}`)}>
            <FlexContainer isFlexJustifyBetween>
              <FlexContainer isFlexColumn isFlexJustifyCenter>
                <FlexContainer className={elMb1}>
                  {iconUri ? (
                    <AppIcon src={iconUri} alt={name} />
                  ) : (
                    <PlaceholderImage placeholder="placeholderSmall" size={32} />
                  )}
                  <AppTitle>{name}</AppTitle>
                </FlexContainer>
                <FeaturedAppStrapline>{summary}</FeaturedAppStrapline>
              </FlexContainer>
            </FlexContainer>
          </AppsCol>
        )
      })}
    </>
  )
})
