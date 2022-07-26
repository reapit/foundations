import React, { FC, memo, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { elFadeIn, FlexContainer, MediaType, PlaceholderImage, useMediaQuery } from '@reapit/elements'
import { AppIcon, SimpleAppsCol, AppTitle, SimpleAppStrapline } from './__styles__'
import { useReapitConnect } from '@reapit/connect-session'
import { Routes } from '../../constants/routes'
import { navigate } from '../../utils/navigation'
import { useHistory } from 'react-router-dom'
import { AppsBrowseConfigItem } from '../../core/use-apps-browse-state'

interface SimpleAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const handleMaxLength = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop, isWideScreen } = mediaQuery

  if (isMobile || isTablet) return 6
  if (isDesktop) return 8
  if (isWideScreen) return 12

  return 20
}

export const SimpleAppsCollection: FC<SimpleAppsCollectionProps> = memo(({ configItem }) => {
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const mediaQuery = useMediaQuery()
  const maxLength = useMemo(handleMaxLength(mediaQuery), [mediaQuery])
  const clientId = connectSession?.loginIdentity.clientId
  const { filters } = configItem
  const queryParams = filters ? { ...filters, clientId } : { clientId }

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
          <SimpleAppsCol key={id} onClick={navigate(history, `${Routes.APPS_BROWSE}/${id}`)}>
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
