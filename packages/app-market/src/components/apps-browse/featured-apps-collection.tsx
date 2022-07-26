import React, { FC, memo, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { objectToQuery, useReapitGet } from '@reapit/utils-react'
import { elFadeIn, elMb1, FlexContainer, MediaType, PlaceholderImage, useMediaQuery } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { AppsBrowseConfigItem, AppsBrowseConfigItemFilters } from '../../core/use-apps-browse-state'
import { AppIcon, AppTitle, AppsCol, FeaturedAppStrapline } from './__styles__'
import { useReapitConnect } from '@reapit/connect-session'
import { navigate } from '../../utils/navigation'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'

interface FeaturedAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const handleMaxLength = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop, isWideScreen } = mediaQuery

  if (isMobile) return 3
  if (isTablet) return 4
  if (isDesktop) return 6
  if (isWideScreen) return 8

  return 12
}

export const FeaturedAppsCollection: FC<FeaturedAppsCollectionProps> = memo(({ configItem }) => {
  const history = useHistory()
  const mediaQuery = useMediaQuery()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const maxLength = useMemo(handleMaxLength(mediaQuery), [mediaQuery])

  const clientId = connectSession?.loginIdentity.clientId
  const { filters } = configItem
  const queryParams = filters ? { ...objectToQuery<AppsBrowseConfigItemFilters>(filters), clientId } : { clientId }

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [filters],
  })

  return (
    <>
      {apps?.data?.map(({ id, name, summary, iconUri }, index) => {
        if (maxLength <= index) return null

        return (
          <AppsCol className={elFadeIn} key={id} onClick={navigate(history, `${Routes.APPS_BROWSE}/${id}`)}>
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
