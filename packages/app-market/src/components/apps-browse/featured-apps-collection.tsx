import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { objectToQuery, useReapitGet } from '@reapit/utils-react'
import { BodyText, elFadeIn, FlexContainer, PlaceholderImage } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { AppsBrowseConfigItem, AppsBrowseConfigItemFilters } from '../../core/use-apps-browse-state'
import { AppIcon, appTitleOneLine, FeaturedAppsCol } from './__styles__'
import { useReapitConnect } from '@reapit/connect-session'
import { navigate } from '../../utils/navigation'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'

interface FeaturedAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const FeaturedAppsCollection: FC<FeaturedAppsCollectionProps> = ({ configItem }) => {
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
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
      {apps?.data?.map(({ id, name, summary, iconUri }) => (
        <FeaturedAppsCol className={elFadeIn} key={id} onClick={navigate(history, `${Routes.APPS_BROWSE}/${id}`)}>
          <FlexContainer isFlexJustifyBetween>
            <FlexContainer isFlexColumn isFlexJustifyCenter>
              <FlexContainer>
                {iconUri ? (
                  <AppIcon src={iconUri} alt={name} />
                ) : (
                  <PlaceholderImage placeholder="placeholderSmall" size={32} />
                )}
                <BodyText className={appTitleOneLine} hasBoldText hasNoMargin>
                  {name}
                </BodyText>
              </FlexContainer>
              <BodyText className={appTitleOneLine} hasGreyText hasNoMargin>
                {summary}
              </BodyText>
            </FlexContainer>
          </FlexContainer>
        </FeaturedAppsCol>
      ))}
    </>
  )
}
